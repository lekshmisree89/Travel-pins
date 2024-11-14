//import { Country } from '../models/index.js';

import { signToken, AuthenticationError } from '../services/auth.js'; // laxmi to check this import
import mongoose from 'mongoose';
import {User }from '../models/index.js'; // Add missing import
// interface for arguments passed to the mutations


interface User {
  _id: string;
  username: string;
  email: string;

 
}
interface Context {// Define the context interface
    user: User;
}




interface AddUserArgs {

  username: string;
  email: string;
  password: string;

}

interface AddUserArgs {

  username: string;
  email: string;
  password: string;

}

interface UserArgs {
  email: string;
  password: string;
}



export const resolvers = {
  Query: {
    me: async (_parent: any, _args: unknown, context: Context) => {
      if (context.user) {
          const userData = await User.findOne({ _id: new mongoose.Types.ObjectId(context.user._id) }) // Cast _id to ObjectId
              .select('-__v -password')
              .populate('savedBooks');

          return userData;
      }
      throw new AuthenticationError('Not logged in');
  },
  },

    











  Mutation: {

    // ...

    login: async (_parent: any, { email, password }: UserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
          throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
  addUser: async (_parent: any, args: AddUserArgs) => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
  },

  }
};


 
//adit:user part is done pls continue below
    



//     // Create a new country
//     addCountry: async (_: any, { name, code }: { name: string; code: string }) => {
//       const newCountry = new Country({ name, code });
//       await newCountry.save();
//       return newCountry;
//     },
//   
  
export default resolvers;
