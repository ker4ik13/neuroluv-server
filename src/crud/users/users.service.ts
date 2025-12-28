import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { type Prisma, type User, UserRole } from '@prisma/client';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '@/database';
import {
  generateMetaPage,
  PageDto,
  type PageOptionsDto,
} from '@/lib/utils/pagination';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const now = new Date().toISOString();
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
      include: {
        _count: true,
        favoriteAlbums: true,
        favoritePhotos: true,
        notificationRecipients: true,
      },
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const search = pageOptionsDto.search?.trim();
    let result: User[] = [];

    const whereClause: Prisma.UserWhereInput | undefined = search
      ? {
          OR: [
            /^\d+$/.test(search)
              ? {
                  telegramId: BigInt(search),
                }
              : undefined,
            {
              firstName: {
                startsWith: search,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                startsWith: search,
                mode: 'insensitive',
              },
            },
            {
              userName: {
                startsWith: search,
                mode: 'insensitive',
              },
            },
            // TODO: проверить этот поиск
            ...(() => {
              const [firstName, lastName] = search.split(/\s+/, 2);

              if (!firstName || !lastName) {
                return [];
              }

              return [
                {
                  AND: [
                    {
                      firstName: {
                        startsWith: firstName,
                        mode: 'insensitive',
                      },
                    },
                    {
                      lastName: {
                        startsWith: lastName,
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
              ];
            })(),
          ].filter(Boolean) as Prisma.UserWhereInput[],
        }
      : undefined;

    result = await this.database.user.findMany({
      where: whereClause,
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        id: pageOptionsDto.order,
      },
      include: {
        _count: true,
      },
    });

    const allUsersCount = await this.database.user.count({
      where: whereClause,
    });

    return generateMetaPage<User>(result, allUsersCount, pageOptionsDto);
  }

  async findOne(telegramId: number): Promise<User> {
    try {
      const user = await this.database.user.findUnique({
        where: {
          telegramId,
        },
        include: {
          _count: true,
          favoriteAlbums: true,
          favoritePhotos: true,
          notificationRecipients: true,
        },
      });

      if (!user) {
        throw new NotFoundException(
          {},
          {
            cause: 'User not found',
            description: 'User with same telegramId not found',
          },
        );
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    telegramId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.database.user.update({
      where: {
        telegramId,
      },
      data: {
        ...updateUserDto,
      },
      include: {
        _count: true,
        favoriteAlbums: true,
        favoritePhotos: true,
        notificationRecipients: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        {},
        {
          cause: 'User not found',
          description: 'User with same telegramId not found',
        },
      );
    }

    return user;
  }

  async remove(telegramId: number): Promise<User> {
    const deletedUser = await this.database.user.delete({
      where: {
        telegramId,
      },
    });

    if (!deletedUser) {
      throw new NotFoundException(
        {},
        {
          cause: 'User not found',
          description: 'User with same telegramId not found',
        },
      );
    }

    return deletedUser;
  }
}
