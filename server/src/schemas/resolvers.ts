import { signToken, AuthenticationError } from '../services/auth.js'; // laxmi to check this import
import mongoose from 'mongoose';
import { User, Country } from '../models/index.js'; // Add missing import

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
  name: string;
}

interface AddCountryArgs {
  input: {
    name: string;
    notes: string;
  }
}

interface AddDishesArgs {
  countryId: string;
  name: string;
}



export const resolvers = {
  Query: {
    me: async (_parent: any, _args: unknown, context: Context) => {
      if (context.user) {
          const userData = await User.findOne({ _id: new mongoose.Types.ObjectId(context.user._id) }) // Cast _id to ObjectId
              .select('-__v -password');

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

    //pls create queries for country











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
  addCountry: async (_: any, { input }: AddCountryArgs) => {
    return await Country.create(input);
  },
  // Update a country
  updateCountry: async (_: any, { countryId, input }: { countryId: string; input: AddCountryArgs['input'] }) => {
    return await Country.findByIdAndUpdate (countryId, input, { new: true });
  },
  // Delete a country
  deleteCountry: async (_: any, { countryId }: CountryArgs) => {
    return await Country.findByIdAndDelete(countryId);
  },
  // Add a dish to a country
  addDishes: async (_: any, { countryId, name }: AddDishesArgs) => {
    return await Country.findByIdAndUpdate(countryId, { $push: { dishes: name } }, { new: true });
  },
  // Delete a dish in a country
  deleteDishes: async (_: any, { dishId, countryId }: { dishId: string; countryId: string }) => {
    return await Country.findByIdAndUpdate(countryId, { $pull: { dishes: { _id: dishId } } }, { new: true });
  }
  }
};


 
//aditi:user part is done pls continue below 
  
export default resolvers;
