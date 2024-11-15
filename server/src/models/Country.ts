import { Schema, model, Document } from 'mongoose';

interface ICountry extends Document {
  name: string;
  dishes: Schema.Types.ObjectId[];
  notes: string;
}


const countrySchema: Schema = new Schema({
    name: { type: String, required: true },
    dishes: { type: Schema.Types.ObjectId, ref: 'Dishes', required: true },
    notes: { type: String, required: true },
  });
  
  const Country = model<ICountry>('Country', countrySchema);
  
  export default Country; 