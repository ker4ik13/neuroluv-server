import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from '@/database';
import type { Album, Prisma } from '@prisma/client';
import {
  generateMetaPage,
  type PageDto,
  type PageOptionsDto,
} from '@/lib/utils/pagination';

@Injectable()
export class AlbumsService {
  constructor(private readonly database: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const {
        photos,
        usersAddedToFavorites,
        albumCover,
        neuralNetworkId,
        ...data
      } = createAlbumDto;

      return await this.database.album.create({
        data: {
          ...data,
          ...(data.isPublished === true
            ? {
                publishedAt: new Date().toISOString(),
              }
            : {
                publishedAt: null,
              }),
          albumCover: { connect: { id: albumCover } },
          ...(neuralNetworkId && {
            neuralNetwork: { connect: { id: neuralNetworkId } },
          }),
          ...(usersAddedToFavorites && {
            usersAddedToFavorites: {
              connect: usersAddedToFavorites.map((id) => ({ id })),
            },
          }),
          ...(photos && {
            photos: {
              connect: photos.map((id) => ({ id })),
            },
          }),
        },
        include: {
          neuralNetwork: true,
          albumCover: true,
          _count: true,
          photos: true,
          usersAddedToFavorites: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(pageOptions: PageOptionsDto): Promise<PageDto<Album>> {
    const search = pageOptions.search?.trim();

    const whereClause: Prisma.AlbumWhereInput | undefined = search
      ? {
          OR: [
            /^\d+$/.test(search) ? { id: Number(search) } : undefined,
            { title: { startsWith: search, mode: 'insensitive' } },
            { slug: { startsWith: search, mode: 'insensitive' } },
            { description: { startsWith: search, mode: 'insensitive' } },
          ].filter(Boolean) as Prisma.AlbumWhereInput[],
        }
      : undefined;

    const result = await this.database.album.findMany({
      where: whereClause,
      skip: pageOptions.skip,
      take: pageOptions.take,
      orderBy: { id: pageOptions.order },
      include: {
        neuralNetwork: true,
        albumCover: true,
        photos: {
          take: 5,
          include: {
            _count: true,
            styles: true,
            usersAddedToFavorites: {
              include: {
                _count: true,
              },
            },
          },
        },
        _count: true,
      },
    });

    const itemsCount = await this.database.album.count({
      where: whereClause,
    });

    return generateMetaPage(result, itemsCount, pageOptions);
  }

  async findOne(id: number): Promise<Album> {
    const result = await this.database.album.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        neuralNetwork: true,
        albumCover: true,
        photos: {
          include: {
            styles: true,
            neuralNetwork: true,
            usersAddedToFavorites: true,
            _count: true,
          },
        },
        usersAddedToFavorites: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Album not found');
    }

    return result;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const {
      photos,
      usersAddedToFavorites,
      albumCover,
      neuralNetworkId,
      ...data
    } = updateAlbumDto;

    const result = await this.database.album.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(data.isPublished === true
          ? {
              publishedAt: new Date(),
            }
          : {
              publishedAt: null,
            }),
        ...(albumCover && {
          albumCover: {
            connect: {
              id: albumCover,
            },
          },
        }),
        ...(neuralNetworkId && {
          neuralNetwork: {
            connect: {
              id: neuralNetworkId,
            },
          },
        }),
        ...(usersAddedToFavorites && {
          usersAddedToFavorites: {
            connect: usersAddedToFavorites.map((userId) => ({ id: userId })),
          },
        }),
        ...(photos && {
          photos: {
            connect: photos.map((photoId) => ({ id: photoId })),
          },
        }),
      },
      include: {
        neuralNetwork: true,
        albumCover: true,
        photos: true,
        usersAddedToFavorites: true,
        _count: true,
      },
    });

    return result;
  }

  async remove(id: number): Promise<Album> {
    const result = await this.database.album.delete({
      where: {
        id,
      },
      include: {
        _count: true,
        neuralNetwork: true,
        albumCover: true,
        photos: true,
        usersAddedToFavorites: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Album not found');
    }

    return result;
  }
}
