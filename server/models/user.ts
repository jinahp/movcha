import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  image?: string;
  token?: string;
  tokenExp?: number;
  comparePassword: (plainPassword: string) => Promise<boolean>;
  generateToken: () => Promise<string>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    maxlength: 30,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    maxlength: 30,
    required: true,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const bcrypt = require('bcrypt');

userSchema.methods.comparePassword = async function (
  plainPassword: string,
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateToken = async function (): Promise<string> {
  try {
    const token = jwt.sign(this._id.toHexString(), 'secretToken');
    this.token = token;
    await this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
