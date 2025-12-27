import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { PageDto, PageOptionsDto } from '@/lib/utils/pagination';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return await this.usersService.findAll(new PageOptionsDto(pageOptionsDto));
  }

  @Get(':telegramId')
  findOne(@Param('telegramId') telegramId: string) {
    return this.usersService.findOne(+telegramId);
  }

  @Patch(':telegramId')
  update(
    @Param('telegramId') telegramId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+telegramId, updateUserDto);
  }

  @Delete(':telegramId')
  remove(@Param('telegramId') telegramId: string) {
    return this.usersService.remove(+telegramId);
  }
}
