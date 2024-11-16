import { signToken, AuthenticationError } from '../services/auth.js'; 
import mongoose from 'mongoose';
import { User, Country } from '../models/index.js'; 

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

interface CountryArgs{
  countryId: string;
  countryName: string;
}


interface AddCountryArgs {
  input: {
    countryName: string;
    notes: string;
  }
}

interface AddDishesArgs {
  countryId: string;
  dishName: string;
}


interface RemoveDishesArgs {
  dishId: string;
  countryId: string;
}


export const resolvers = {
  Query: {
    me: async (_parent: any, _args: unknown, context: Context) => {
      if (context.user) {
          const userData = await User.findOne({ _id: new mongoose.Types.ObjectId(context.user._id) }) // Cast _id to ObjectId
              .select('-__v -password')
              .populate('Country');

          return userData;
      }
      throw new AuthenticationError('Not logged in');
  },
  // get all countries
    countries: async () => {
      return await Country.find({});
    },
    // get a country by id
    country: async (_: any, { countryId }: CountryArgs) => {
      return await Country.findById(countryId);
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
    return await Country.findByIdAndUpdate (countryId, input, { new: true });
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
      { $addToSet: { dishes: dishName } }, 
      { new: true, runValidators: true });
  }
  throw AuthenticationError;
  },
  // Delete a dish in a country
  deleteDishes: async (_: any, { dishId, countryId }: RemoveDishesArgs) => {
    return await Country.findByIdAndUpdate(countryId, { $pull: { dishes: { _id: dishId } } }, { new: true });
  }
  }
};
  
export default resolvers;
