import { User, Country } from '../models/index.js';

export const resolvers = {
  Query: {
    users: async () => await User.find(),
    country: async () => await Country.find()
  },
  Mutation: {
    addUser: async (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    },
    addCountry: async (_: any, { name, code }: { name: string; code: string }) => {
      const newCountry = new Country({ name, code });
      await newCountry.save();
      return newCountry;
  },
}
};
