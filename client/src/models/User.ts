import { Country } from './Country'; // Ensure you have a Country interface defined

export interface User {
  id: string; // User's unique identifier
  username: string; // Updated to align with your schema
  email: string; // User's email
  password?: string; // Optional to avoid exposing it unnecessarily in client code
  countries: Country[]; // Array of countries associated with the user
}
