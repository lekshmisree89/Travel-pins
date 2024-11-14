import { User, Country } from '../models/index.js';

// interface for arguments passed to the mutations
interface 

export const resolvers = {
  Query: {
    // Get all users and countries
    users: async () => await User.find(),
    country: async () => await Country.find()
  },
  Mutation: {
    // Create a new user
    addUser: async (_: any, { username, email }: { username: string; email: string }) => {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    },
    // Create a new country
    addCountry: async (_: any, { name, code }: { name: string; code: string }) => {
      const newCountry = new Country({ name, code });
      await newCountry.save();
      return newCountry;
  },
  // Update a user by ID
}};
