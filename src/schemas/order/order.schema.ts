import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductType } from '../../types/ProductType';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  products: ProductType[];

  @Prop({ default: '-' })
  message: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
