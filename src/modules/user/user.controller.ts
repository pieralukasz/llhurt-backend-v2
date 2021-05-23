import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateUserDto, PaginationDto, UpdateUserDto } from '@dto';
import { User } from '@schemas';

import { UserService } from './user.service';
import { Schema as MongooseSchema } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getAllUsers(@Res() res, @Query() pagination: PaginationDto) {
    const users = await this.userService.findAllUsers(pagination);
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('find/:id')
  async getUserById(
    @Res() res,
    @Param('id') userId: MongooseSchema.Types.ObjectId,
  ) {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('Error: User does not exist');
      }
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `Success: User has been found`,
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Error: User can not be found',
      });
    }
  }

  @Post('create')
  async createUser(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Success: User has been created',
        user,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: `Error: User not created | ${error.message}`,
      });
    }
  }

  @Put('update/:id')
  async updateUser(
    @Res() res,
    @Param('id') userId: MongooseSchema.Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.updateUser(userId, updateUserDto);
      if (!user) {
        throw new NotFoundException('Error: User does not exist');
      }
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success: User has been updated',
        user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Error: User not updated',
      });
    }
  }
}
