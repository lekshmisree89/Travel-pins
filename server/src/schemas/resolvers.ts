import { signToken } from '../services/auth.js'; 
import mongoose from 'mongoose';
import { User, Country } from '../models/index.js'; 
import { AuthenticationError } from 'apollo-server-express';

// Interface Definitions
interface User {
  _id: string;
  username: string;
  email: string; 
}

interface Context {
  user: User;
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

interface CountryArgs {
  countryId: string;
  countryName: string;
}

interface AddCountryArgs {
  input: {
    countryName: string;
    notes: string;
  };
}

interface AddDishesArgs {
  countryId: string;
  dishName: string;
}

interface RemoveDishesArgs {
  countryId: string;
  dishId: string;
}

interface AddUserCountryArgs {
  userId: string;
  countryId: string;
}

export const resolvers = {
  Query: {
    // users: async () => {
    //   return await User.find({}).populate('country');
    // },

    me: async (_parent: any, _args: unknown, context: Context) => {
      if (context.user) {
          const userData = await User.findOne({ _id: new mongoose.Types.ObjectId(context.user._id) }) // Cast _id to ObjectId
              .populate({path: 'countries', select: 'countryName dishes'});

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    // Get all countries
    countries: async () => {
      return await Country.find({});
    },

    countryByName: async (_parent: any, { countryName }: { countryName: string }) => {
      return await Country.findOne({ countryName });
    },

    // Get a country by its ID
    country: async (_: any, { countryId }: CountryArgs) => {
      return await Country.findById(countryId);
    },
  },

  Mutation: {
    // User login
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

    // Add a new user
    addUser: async (_parent: any, args: AddUserArgs) => {
      const user = await User.create(args);
      console.log('log: user', user);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
  },
  // Add a country
  addCountry: async (_: unknown, { input }: AddCountryArgs, context: Context) => {
    if (context.user) {
      const newCountry = await Country.create({...input});
      await User.findOneAndUpdate(
        {_id: context.user._id}, 
        { $addToSet: { countries: newCountry._id } });
      return newCountry;
    }
    throw new AuthenticationError('You need to be logged in to perform this action');
  },
  // Update a country
  updateCountry: async (_: any, { countryId, input }: { countryId: string; input: AddCountryArgs['input'] }) => {
    return await Country.findOneAndUpdate({ _id: countryId }, input, { new: true });
  },

  // Delete a country
deleteCountry: async (_: any, { countryId }: CountryArgs, context: any) => {
  if (context.user) {
    const country = await Country.findByIdAndDelete(countryId);
    if (!country) {
      throw new Error('No country found');
    }
    await User.findOneAndUpdate(
      {_id: context.user._id}, 
      { $pull: { countries: countryId } });
    
    return country;
  }
  throw AuthenticationError;
},
  // Add a dish to a country
  addDishes: async (_: any, { countryId, dishName }: AddDishesArgs, context: any) => {
    if (context.user) {
      return Country.findOneAndUpdate(
      {_id: countryId}, 
      { $addToSet: { dishes: {dishName} } }, 
      { new: true, runValidators: true });
  }
  throw AuthenticationError;
  },
  // Delete a dish in a country
  deleteDishes: async (_parent: any, { countryId, dishId }: RemoveDishesArgs, context: any) => {
    if (context.user) {
      return Country.findOneAndUpdate(
        { _id: countryId },
        {
          $pull: {
            dishes: {
              _id: dishId
            },
          },
        },
        { new: true }
      );
    }
    throw AuthenticationError;
  },
  // Add a country to user's list
    // find a specific user
    // update user's countries array with the countryId
    // return the updated user
  // Add a country to user's list
    // find a specific user
    // update user's countries array with the countryId
    // return the updated user
    addUserCountry: async (_parent: unknown, { userId, countryId }: AddUserCountryArgs, context: any) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { countries: countryId } }, //$push
          { new: true, runValidators: true },
        ).populate({path: 'countries', select: 'countryName dishes'});
      
      }
      throw new AuthenticationError('You need to be logged in to perform this action');
    },
},
};


export default resolvers;
