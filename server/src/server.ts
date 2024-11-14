import express, { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
//import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import typeDefs from './schemas/typeDefs.js';
import {resolvers } from './schemas/resolvers.js';

// Load environment variables from .env file
dotenv.config();

// Apollo Server configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    await server.start();
    await db();

    const PORT = process.env.PORT || 3001;
    const app = express();

    // Middleware to parse incoming requests
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Apply Apollo GraphQL middleware with authentication context
    app.use('/graphql', expressMiddleware(server, {
      context: authenticateToken,
    }));

    // Resolve __dirname in ES module environment
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Serve static files in production mode
    if (process.env.NODE_ENV === 'production') {
      const staticPath = path.join(__dirname, '../../client/dist/');

      app.use(express.static(staticPath));

      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(staticPath, 'index.html'), (err) => {
          if (err) {
            console.error('Failed to load index.html:', err);
            res.status(500).send('Error loading the application');
          }
        });
      });
    }

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

// Initialize the Apollo Server
startApolloServer();
