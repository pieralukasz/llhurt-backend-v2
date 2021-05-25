import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Res,
  Req,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import UpdateBasketDto from '../../dto/basket/update-basket';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get()
  async getBasket(@Req() req, @Res() res) {
    try {
      const basket = await this.basketService.findBasketByUserId(req.user.sub);
      if (!basket) {
        throw new NotFoundException('Error: User does not exist');
      }
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success: Basket has been found',
        basket,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: 'Error: Basket can not be found',
      });
    }
  }

  @Put('update')
  async updateBasket(
    @Req() req,
    @Res() res,
    @Body() updateBasketDto: UpdateBasketDto,
  ) {
    try {
      const basket = await this.basketService.findBasketByUserIdAndUpdate(
        req.user.sub,
        updateBasketDto,
      );

      console.log(basket);

      if (!basket) {
        throw new NotFoundException('Error: User does not exist');
      }
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success: Basket has been found',
        basket,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: 'Error: Basket can not be found',
      });
    }
  }
}
