import db from '../config/connection.js';
import { User, Country } from '../models/index.js';
import userSeeds from './userData.json' with { type: "json" };
import countrySeeds from './countryData.json' with { type: "json" };
// import dishSeeds from './dishData.json' with { type: "json" };
import cleanDB from './cleanDB.js';

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await User.insertMany(userSeeds);
    await Country.insertMany(countrySeeds);
    // await Dishes.insertMany(dishSeeds);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error seeding database:', error.message);
    } else {
      console.error('Unknown error seeding database');
    }
    process.exit(1);
  }
};

seedDatabase();
