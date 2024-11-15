import { Schema, model, Document } from 'mongoose';

interface IDishes extends Document {
  name: string;
}

interface ICountry extends Document {
  name: string;
  dishes: IDishes[];
  notes: string;
}

const dishSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true 
  }
},
{ _id: false,
  toJSON: { getters: true },
  toObject: { getters: true }, 
  timestamps: true },
);

const countrySchema: Schema = new Schema({
    name: { type: String, required: true },
    dishes: { type: [dishSchema], required: true },
    notes: { type: String, required: true },
  });
  
  const Country = model<ICountry>('Country', countrySchema);
  
  export default Country; 