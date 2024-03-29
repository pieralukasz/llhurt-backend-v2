import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductType } from '../../types/ProductType';

export type BasketDocument = Basket & Document;

@Schema()
export class Basket {
  @Prop({ required: true })
  userId: string;

  @Prop()
  products: ProductType[];

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
