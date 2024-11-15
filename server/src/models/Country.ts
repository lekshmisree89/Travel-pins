import { Schema, model, Document } from 'mongoose';

interface ICountry extends Document {
  name: string;
  dishes: Schema.Types.ObjectId[];
  notes: string;
}

// const dishSchema: Schema = new Schema({
//   name: { 
//     type: String, 
//     required: true 
//   }
// },
// { toJSON: { getters: true },
//   toObject: { getters: true }, 
//   timestamps: true },
// );

// model<IDishes>('Dishes', dishSchema);

const countrySchema: Schema = new Schema({
    name: { type: String, required: true },
    dishes: { type: Schema.Types.ObjectId, ref: 'Dishes', required: true },
    notes: { type: String, required: true },
  });
  
  const Country = model<ICountry>('Country', countrySchema);
  
  export default Country; 