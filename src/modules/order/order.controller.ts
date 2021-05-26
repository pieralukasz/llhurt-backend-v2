import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { BasketService } from '../basket/basket.service';
import { Role } from '../../types/enum/Role';
import { Roles } from '../../utils/decorators';
import { CreateOrderDto, PaginationDto } from '@dto';
import { MailService } from '../mail/mail.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly basketService: BasketService,
    private readonly mailService: MailService,
  ) {}

  @Get('list')
  @Roles(Role.Admin)
  async findAll(@Res() res, @Query() pagination: PaginationDto) {
    try {
      const orders = await this.orderService.findAllOrders(pagination);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success: Order list ',
        orders,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: `Error | ${error.message}`,
      });
    }
  }

  // TODO find by ID
  // TODO find by email
  // TODO deleteOrder
  // TODO updateOrder

  @Post('create')
  async createOrder(
    @Req() req,
    @Res() res,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    try {
      const basket = await this.basketService.findBasketByUserId(req.user.sub);
      const order = this.orderService.createNewOrder(
        createOrderDto,
        basket,
        req.user.sub,
      );

      if (order) {
        await this.basketService.findBasketByUserIdAndUpdate(req.user.sub, {
          products: [],
        });
      }

      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Success: Order has been created',
        order,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: `Error: Order not created | ${error.message}`,
      });
    }
  }
}
