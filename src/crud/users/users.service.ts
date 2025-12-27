import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '@/database';
import { User, UserRole } from '@prisma/client';
import {
  generateMetaPage,
  PageDto,
  PageOptionsDto,
} from '@/lib/utils/pagination';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const now = new Date();
    const telegramId = BigInt(createUserDto.telegramId);

    return this.database.user.upsert({
      where: { telegramId },
      create: {
        telegramId,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        userName: createUserDto.userName,
        languageCode: createUserDto.languageCode,
        role: UserRole.USER,
        authDate: now,
        lastSeenAt: now,
      },
      update: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        userName: createUserDto.userName,
        languageCode: createUserDto.languageCode,
        lastSeenAt: now,
      },
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    let result: User[] = [];

    if (pageOptionsDto.search) {
      result = await this.database.user.findMany({
        where: {
          OR: [
            {
              telegramId: {
                equals: Number(pageOptionsDto.search),
              },
            },
            {
              firstName: {
                startsWith: pageOptionsDto.search,
              },
            },
            {
              lastName: {
                startsWith: pageOptionsDto.search,
              },
            },
            {
              userName: {
                startsWith: pageOptionsDto.search,
              },
            },
          ],
        },
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        orderBy: {
          id: pageOptionsDto.order,
        },
      });
    } else {
      result = await this.database.user.findMany({
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        orderBy: {
          id: pageOptionsDto.order,
        },
      });
    }

    const allUsersCount = await this.database.user.count();

    return generateMetaPage<User>(result, allUsersCount, pageOptionsDto);
  }

  async findOne(telegramId: number) {
    return await this.database.user.findUnique({
      where: {
        telegramId,
      },
    });
  }

  async update(telegramId: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${telegramId} user`;
  }

  async remove(telegramId: number) {
    return `This action removes a #${telegramId} user`;
  }
}
