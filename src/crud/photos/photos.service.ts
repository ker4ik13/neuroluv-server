import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo, Prisma } from '@prisma/client';
import { DatabaseService } from '@/database';
import { generateMetaPage, PageOptionsDto } from '@/lib/utils/pagination';

@Injectable()
export class PhotosService {
  constructor(private readonly database: DatabaseService) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    try {
      const {
        styles,
        albums,
        usersAddedToFavorites,
        neuralNetworkId,
        file,
        ...data
      } = createPhotoDto;

      const fileFromDb = await this.database.file.findUnique({
        where: {
          id: file,
        },
      });

      if (!fileFromDb) {
        throw new NotFoundException('File not found');
      }

      return await this.database.photo.create({
        data: {
          ...data,
          ...(data.isPublished === true
            ? {
                publishedAt: new Date().toISOString(),
              }
            : {
                publishedAt: null,
              }),
          file: { connect: { id: fileFromDb.id } },
          neuralNetwork: { connect: { id: neuralNetworkId } },
          ...(usersAddedToFavorites && {
            usersAddedToFavorites: {
              connect: usersAddedToFavorites.map((id) => ({ id })),
            },
          }),
          ...(albums && {
            albums: {
              connect: albums.map((id) => ({ id })),
            },
          }),
          ...(styles && {
            styles: {
              connect: styles.map((id) => ({ id })),
            },
          }),
        },
        include: {
          neuralNetwork: true,
          usersAddedToFavorites: true,
          albums: true,
          styles: true,
          file: true,
          _count: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(pageOptions: PageOptionsDto) {
    const search = pageOptions.search?.trim();

    const whereClause: Prisma.PhotoWhereInput | undefined = search
      ? {
          OR: [
            /^\d+$/.test(search) ? { id: Number(search) } : undefined,
            { name: { startsWith: search, mode: 'insensitive' } },
            { slug: { startsWith: search, mode: 'insensitive' } },
            { description: { startsWith: search, mode: 'insensitive' } },
          ].filter(Boolean) as Prisma.PhotoWhereInput[],
        }
      : undefined;

    const result = await this.database.photo.findMany({
      where: whereClause,
      skip: pageOptions.skip,
      take: pageOptions.take,
      orderBy: { id: pageOptions.order },
      include: {
        neuralNetwork: true,
        file: true,
        _count: true,
      },
    });

    const itemsCount = await this.database.photo.count({
      where: whereClause,
    });

    return generateMetaPage(result, itemsCount, pageOptions);
  }

  async findOne(id: number) {
    const result = await this.database.photo.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        neuralNetwork: true,
        file: true,
        albums: true,
        styles: true,
        usersAddedToFavorites: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Photo not found');
    }

    return result;
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    const {
      styles,
      albums,
      usersAddedToFavorites,
      neuralNetworkId,
      file: fileId,
      ...data
    } = updatePhotoDto;

    const file =
      fileId !== undefined
        ? await this.database.file.findUnique({
            where: {
              id: fileId,
            },
          })
        : null;

    if (fileId !== undefined && !file) {
      throw new NotFoundException('File not found');
    }

    const result = await this.database.photo.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(file && {
          name: file.originalname,
          file: { connect: { id: file.id } },
        }),
        ...(data.isPublished === true
          ? {
              publishedAt: new Date().toISOString(),
            }
          : {
              publishedAt: null,
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
            connect: usersAddedToFavorites.map((id) => ({ id })),
          },
        }),
        ...(albums && {
          albums: {
            connect: albums.map((id) => ({ id })),
          },
        }),
        ...(styles && {
          styles: {
            connect: styles.map((id) => ({ id })),
          },
        }),
        // TODO: добавить связи с users
      },

      include: {
        neuralNetwork: true,
        albums: true,
        styles: true,
        usersAddedToFavorites: true,
        file: true,
        _count: true,
      },
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.database.photo.delete({
      where: {
        id,
      },
      include: {
        _count: true,
        neuralNetwork: true,
        albums: true,
        styles: true,
        usersAddedToFavorites: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Photo not found');
    }

    return result;
  }
}
