import { Schema, model, Document } from 'mongoose';

interface IDishes extends Document {
  dishName: string;
}

const dishSchema: Schema = new Schema<IDishes>({
  dishName: { 
    type: String, 
    required: true 
  }
},
{ toJSON: { getters: true },
  toObject: { getters: true }, 
  timestamps: true },
);


interface ICountry extends Document {
  countryId: string;
  countryName: string;
  dishes: IDishes[];
  notes: string;
}


const countrySchema: Schema = new Schema<ICountry>({
    countryName: { type: String, required: true },
    dishes: { type: [dishSchema], required: true },
    notes: { type: String, required: true },
  });
  
  const Country = model<ICountry>('Country', countrySchema);
  
  export default Country; 