import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../user';

export type BasketDocument = Basket & Document;

@Schema()
export class Basket {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  products: any[];

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
