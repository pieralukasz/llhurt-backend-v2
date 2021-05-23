import { Schema as MongooseSchema } from 'mongoose';

export type TokenResponse = {
  id: MongooseSchema.Types.ObjectId;
  email: string;
};
