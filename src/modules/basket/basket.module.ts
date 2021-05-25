import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Basket, BasketSchema } from '@schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Basket.name, schema: BasketSchema }]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export default class BasketModule {}
