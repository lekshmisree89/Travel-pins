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
  name: string;
}

interface AddCountryArgs {
  input: {
    name: string;
    notes: string;
  };
}

interface AddDishesArgs {
  countryId: string;
  name: string;
}

interface RemoveDishesArgs {
  dishId: string;
  countryId: string;
}

export const resolvers = {
  Query: {
    // Get logged-in user's information
    me: async (_parent: any, _args: unknown, context: Context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: new mongoose.Types.ObjectId(context.user._id) })
          .select('-__v -password')
          .populate({
            path: 'countries',
            populate: {
              path: 'dishes',
              model: 'Dish', // Replace with the correct model name for dishes if different
            },
          });

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    // Get all countries
    countries: async () => {
      return await Country.find({});
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
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Add a new country
    addCountry: async (_: unknown, { input }: AddCountryArgs, context: Context) => {
      if (context.user) {
        const newCountry = await Country.create({ ...input });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { countries: newCountry._id } }
        );
        return newCountry;
      }
      throw new AuthenticationError('You need to be logged in to perform this action');
    },

    // Update a country
    updateCountry: async (
      _: any,
      { countryId, input }: { countryId: string; input: AddCountryArgs['input'] }
    ) => {
      return await Country.findByIdAndUpdate(countryId, input, { new: true });
    },

    // Delete a country
    deleteCountry: async (_: any, { countryId }: CountryArgs, context: Context) => {
      if (context.user) {
        const country = await Country.findByIdAndDelete(countryId);
        if (!country) {
          throw new Error('No country found');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { countries: countryId } }
        );

        return country;
      }
      throw new AuthenticationError('You need to be logged in to perform this action');
    },

    // Add a dish to a country
    addDishes: async (_: any, { countryId, name }: AddDishesArgs, context: Context) => {
      if (context.user) {
        return await Country.findByIdAndUpdate(
          countryId,
          { $addToSet: { dishes: { name } } }, // Ensure `dishes` is an array of objects
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in to perform this action');
    },

    // Delete a dish in a country
    deleteDishes: async (_: any, { dishId, countryId }: RemoveDishesArgs) => {
      return await Country.findByIdAndUpdate(
        countryId,
        { $pull: { dishes: { _id: dishId } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
