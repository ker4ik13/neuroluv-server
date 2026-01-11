import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumCoverDto } from './dto/create-album-cover.dto';
import { UpdateAlbumCoverDto } from './dto/update-album-cover.dto';
import { DatabaseService } from '@/database';
import type { AlbumCover, Prisma } from '@prisma/client';
import {
  generateMetaPage,
  type PageDto,
  type PageOptionsDto,
} from '@/lib/utils/pagination';

@Injectable()
export class AlbumCoversService {
  constructor(private readonly database: DatabaseService) {}

  async create(createAlbumCoverDto: CreateAlbumCoverDto): Promise<AlbumCover> {
    try {
      const { albumId, file, ...coverData } = createAlbumCoverDto;

      const fileFromDb = await this.database.file.findUnique({
        where: {
          id: file,
        },
      });

      if (!fileFromDb) {
        throw new NotFoundException('File not found');
      }

      return await this.database.albumCover.create({
        data: {
          ...coverData,
          file: { connect: { id: fileFromDb.id } },
          ...(albumId && {
            album: { connect: { id: albumId } },
          }),
        },
        include: {
          album: true,
          file: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(pageOptions: PageOptionsDto): Promise<PageDto<AlbumCover>> {
    const search = pageOptions.search?.trim();

    const whereClause: Prisma.AlbumCoverWhereInput | undefined = search
      ? {
          OR: [
            /^\d+$/.test(search) ? { id: Number(search) } : undefined,
            {
              file: {
                is: {
                  originalname: { startsWith: search, mode: 'insensitive' },
                },
              },
            },
            { title: { startsWith: search, mode: 'insensitive' } },
            { ext: { startsWith: search, mode: 'insensitive' } },
          ].filter(Boolean) as Prisma.AlbumCoverWhereInput[],
        }
      : undefined;

    const result = await this.database.albumCover.findMany({
      where: whereClause,
      skip: pageOptions.skip,
      take: pageOptions.take,
      orderBy: { id: pageOptions.order },
      include: {
        album: true,
        file: true,
      },
    });

    const itemsCount = await this.database.albumCover.count({
      where: whereClause,
    });

    return generateMetaPage(result, itemsCount, pageOptions);
  }

  async findOne(id: number): Promise<AlbumCover> {
    const result = await this.database.albumCover.findUnique({
      where: {
        id,
      },
      include: {
        album: true,
        file: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Album cover not found');
    }

    return result;
  }

  async update(id: number, updateAlbumCoverDto: UpdateAlbumCoverDto) {
    const { albumId, file: fileId, ...data } = updateAlbumCoverDto;

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

    const result = await this.database.albumCover.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(file && {
          file: { connect: { id: file.id } },
        }),
        ...(albumId && {
          album: { connect: { id: albumId } },
        }),
      },
      include: {
        album: true,
        file: true,
      },
    });

    return result;
  }

  async remove(id: number): Promise<AlbumCover> {
    const result = await this.database.albumCover.delete({
      where: {
        id,
      },
      include: {
        album: true,
        file: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Album cover not found');
    }

    return result;
  }
}
