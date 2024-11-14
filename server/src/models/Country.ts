import mongoose, { Schema, Document } from 'mongoose';

export interface ICountry extends Document {
  name: string;
  dishes: string[];
  notes: string;
}

const countrySchema: Schema = new Schema({
    name: { type: String, required: true },
    dishes: { type: [String], required: true },
    notes: { type: String, required: true },
  });
  
  const Country = mongoose.model<ICountry>('Country', countrySchema);
  
  export default Country; 