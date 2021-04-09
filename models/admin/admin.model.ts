import { model, Schema, Model, Document } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

export interface IAdmin extends Document {
    name: String;
    email: String;
    password: String;
    passwordSalt: String;
  }

export const ADMIN_SCHEMA: Schema = new Schema({
    name: String,
    email: String,
    password: String,
    passwordSalt: String
  });
  ADMIN_SCHEMA.plugin(autopopulate);
  
export const Admin: Model<IAdmin> = model('Admin', ADMIN_SCHEMA);
