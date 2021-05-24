import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../types/enum/Role';
import { ProductType } from '../../types/ProductType';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  taxIdentifier: number;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Role.User, enum: [Role.User, Role.Admin] })
  role: Role;

  @Prop({ default: [] })
  basket: ProductType[];

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
