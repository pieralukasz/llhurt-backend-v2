import { Schema as MongooseSchema } from 'mongoose';

export type TokenResponse = {
  sub: MongooseSchema.Types.ObjectId;
  username: string;
};
