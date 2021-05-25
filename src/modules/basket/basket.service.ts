import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Basket, BasketDocument, User } from '@schemas';
import { Model, Schema, Schema as MongooseSchema } from 'mongoose';
import { ObjectId } from 'mongodb';
import UpdateBasketDto from '../../dto/basket/update-basket';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket.name) private basketModel: Model<BasketDocument>,
  ) {}

  async createBasket(userId: string) {
    await this.basketModel.create({
      userId,
      products: [],
    });
  }

  async findBasketByUserId(userId: string) {
    return this.basketModel.findOne({ userId });
  }

  async findBasketByUserIdAndUpdate(
    userId: string,
    updateBasketDto: UpdateBasketDto,
  ) {
    return this.basketModel.findOneAndUpdate(
      {
        userId,
      },
      updateBasketDto,
      {
        new: true,
      },
    );
  }
}
