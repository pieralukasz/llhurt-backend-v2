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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getAllUsers(@Res() res, @Query() pagination: PaginationDto) {
    const users = await this.userService.findAllUsers(pagination);
    return res.status(HttpStatus.OK).json(users);
  }

  @Post('create')
  async createUser(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'User has been created successfully',
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not created',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Get('find/:id')
  async getUserById(@Res() res, @Param('id') userId: string) {
    try {
      const user = await this.userService.findUserById(userId);
      return res.status(HttpStatus.OK).json({
        message: 'User has been found',
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User can not be found',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Put('update/:id')
  async updateUser(
    @Res() res,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.updateUser(userId, updateUserDto);
      if (!user) {
        throw new NotFoundException('User does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        status: 400,
      });
    }
  }
}
