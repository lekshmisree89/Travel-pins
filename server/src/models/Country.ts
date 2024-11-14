import mongoose, { Schema, Document } from 'mongoose';

export interface ICountry extends Document {
  name: string;
  dishes: string[];
  notes: string;
}
