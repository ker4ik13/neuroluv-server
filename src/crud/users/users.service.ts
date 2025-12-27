import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(telegramId: number) {
    return `This action returns a #${telegramId} user`;
  }

  update(telegramId: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${telegramId} user`;
  }

  remove(telegramId: number) {
    return `This action removes a #${telegramId} user`;
  }
}
