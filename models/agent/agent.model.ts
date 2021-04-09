import { model, Schema, Model, Document } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

export interface IAgent extends Document {
    name: string; 
    email: string; 
    phoneNumber: String;
    password: string; 
    passwordSalt: string;
    avatar: string;
    loginAttempt: Number;
  }

export const AGENT_SCHEMA: Schema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    avatar: String,
    password: String,
    loginAttempt: { type:Number, default:0 },
    passwordSalt: String
  });
  AGENT_SCHEMA.plugin(autopopulate);
  
export const Agent: Model<IAgent> = model('Agent', AGENT_SCHEMA);
