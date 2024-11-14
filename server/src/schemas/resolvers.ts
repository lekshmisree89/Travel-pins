import { User, Country } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js'; // laxmi to check this import

// interface for arguments passed to the mutations
interface LoginUserArgs {
  email: string;
  password: string;
}



export const resolvers = {
  Query: {
    // Get all users and countries
    users: async () => await User.find(),
    countries: async () => await Country.find(),
    // get user by ID
    // user: async (_: any, { userId }: { userId: string }) => {
    //   return await
    //   User.findById(userId);
    // },
    // get country by ID
    country: async (_: any, { countryId }: { countryId: string }) => {
      return await Country.findById(countryId);
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },

  },
  Mutation: {
    // Create a new user
    addUser: async (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = new User({ name, email });
      await newUser.save();
      return newUser;
    },
    // login a user
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      // const correctPw = await user.isCorrectPassword(password);
    
      // // If the password is incorrect, throw an AuthenticationError
      // if (!correctPw) {
      //   throw new AuthenticationError('Could not authenticate user.');
      // }
    
      // Sign a token with the user's information
      const token = signToken(user.name, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    // Create a new country
    addCountry: async (_: any, { name, code }: { name: string; code: string }) => {
      const newCountry = new Country({ name, code });
      await newCountry.save();
      return newCountry;
  },
  
}};
