import { Schema, model, Document } from 'mongoose';

interface IDishes extends Document {
  name: string;
}

const dishSchema: Schema = new Schema<IDishes>({
  name: { 
    type: String, 
    required: true 
  }
},
{ toJSON: { getters: true },
  toObject: { getters: true }, 
  timestamps: true },
);

const Dishes = model<IDishes>('Dishes', dishSchema);
  
export default Dishes; 