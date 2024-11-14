import { User } from '../models/User';

const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    addUser: async (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    },
  },
};

export default resolvers;
