import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Basket, Order, OrderDocument } from '@schemas';
import { Model } from 'mongoose';
import { CreateOrderDto, PaginationDto } from '@dto';
import { Role } from '../../types/enum/Role';
import { ProductType } from '../../types/ProductType';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findAllOrders(pagination: PaginationDto): Promise<Order[]> {
    const { limit, offset } = pagination;

    return await this.orderModel
      .find()
      .skip(+offset)
      .limit(+limit)
      .exec();
  }

  async createNewOrder(
    createOrderDto: CreateOrderDto,
    products: ProductType[],
    userId: string,
  ) {
    return this.orderModel.create({
      userId,
      products,
      ...createOrderDto,
    });
  }
}
