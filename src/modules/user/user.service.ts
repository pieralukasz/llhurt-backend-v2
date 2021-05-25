import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto, PaginationDto, UpdateUserDto } from '@dto';
import { User, UserDocument } from '@schemas';
import { Role } from '../../types/enum/Role';
import { hashPassword } from '../../utils/bcryptPassword';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAllUsers(pagination: PaginationDto): Promise<User[]> {
    const { limit, offset } = pagination;

    return await this.userModel
      .find({
        role: Role.User,
      })
      .skip(+offset)
      .limit(+limit)
      .exec();
  }

  async findUserById(userId: MongooseSchema.Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with #${userId} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) {
      throw new NotFoundException(`User with #${email} not found`);
    }

    return existingUser;
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Partial<User & { _id: string }>> {
    const user = Object.assign(createUserDto, {
      password: await hashPassword(createUserDto.password),
    });

    const createdUser = await this.userModel.create(user);
    return await createdUser.save();
  }

  async updateUser(
    userId: MongooseSchema.Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      {
        new: true,
      },
    );

    if (!existingUser) {
      throw new NotFoundException(`User with #${userId} not found`);
    }

    return existingUser;
  }
}
