import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, PaginationDto, UpdateUserDto } from '@dto';
import { User, UserDocument } from '@schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAllUsers(pagination: PaginationDto): Promise<User[]> {
    const { limit, offset } = pagination;

    return await this.userModel
      .find()
      .skip(+offset)
      .limit(+limit)
      .exec();
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById({ _id: userId }).exec();

    if (!user) {
      throw new NotFoundException(`User with #${userId} not found`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return await createdUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      {
        _id: userId,
      },
      updateUserDto,
    );

    if (!existingUser) {
      throw new NotFoundException(`User with #${userId} not found`);
    }

    return existingUser;
  }
}
