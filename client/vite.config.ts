// server/server.ts
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: Request }) => {
    const token = req.headers.authorization || '';
    let user = null;

    try {
      if (token) {
        user = jwt.verify(token, process.env.JWT_SECRET as string);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }

    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
