import { Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


export interface User extends mongoose.Document {
  id: string;
  username: string;
  email: string;
  password: string;
  country: Schema.Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
 

}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    country: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Country',
      },
    ],
  },
);

// hash user password
userSchema.pre<User>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have


const User = model<User>('User', userSchema);

export default User;