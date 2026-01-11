import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { DatabaseService } from '@/database';
import {
  generateMetaPage,
  type PageDto,
  type PageOptionsDto,
} from '@/lib/utils/pagination';
import { File, Prisma } from '@prisma/client';
import { deleteFiles } from '@/lib/utils';
import type { DeleteFilesDto } from './dto/delete-files.dto';

@Injectable()
export class FileService {
  constructor(private readonly database: DatabaseService) {}

  async getAllFiles(pageOptions: PageOptionsDto): Promise<PageDto<File>> {
    const search = pageOptions.search?.trim();

    const whereClause: Prisma.FileWhereInput | undefined = search
      ? {
          OR: [
            /^\d+$/.test(search) ? { id: Number(search) } : undefined,
            { originalname: { startsWith: search, mode: 'insensitive' } },
          ].filter(Boolean) as Prisma.FileWhereInput[],
        }
      : undefined;

    const result = await this.database.file.findMany({
      where: whereClause,
      skip: pageOptions.skip,
      take: pageOptions.take,
      orderBy: { id: pageOptions.order },
    });

    const itemsCount = await this.database.file.count({
      where: whereClause,
    });

    return generateMetaPage(result, itemsCount, pageOptions);
  }

  async uploadPhotos(
    files: Express.Multer.File[],
    type: 'photo' | 'cover' = 'photo',
  ) {
    const uploadDir = path.join(__dirname, '..', '..', '..', '..', `${type}s`);

    // Если папки не существует - создаем ее
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const savedFiles = files.map((file) => {
      const newFileName = `${new Date().toLocaleString('ru')}-${Buffer.from(
        file.originalname.replaceAll(' ', '_'),
        'latin1',
      ).toString('utf8')}`;
      const filePath = path.join(uploadDir, newFileName);

      fs.writeFileSync(filePath, file.buffer);

      return {
        path: filePath,
        file: {
          originalname: newFileName,
          mimetype: file.mimetype,
          size: file.size,
        },
      };
    });

    await this.database.file.createMany({
      data: savedFiles.map((savedFile) => savedFile.file),
    });

    return {
      files: savedFiles,
    };
  }

  async removePhotos(deleteFilesDto: DeleteFilesDto) {
    const { ids, type = 'photo' } = deleteFilesDto;

    if (!ids.length) {
      throw new BadRequestException('ids are required');
    }

    const files = await this.database.file.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (!files.length) {
      throw new NotFoundException('Files not found');
    }

    deleteFiles(
      files.map((file) => file.originalname),
      type,
    );

    const deleteResult = await this.database.file.deleteMany({
      where: {
        id: { in: files.map((file) => file.id) },
      },
    });

    const foundIds = new Set(files.map((file) => file.id));
    const notFoundIds = ids.filter((id) => !foundIds.has(id));

    return {
      deletedCount: deleteResult.count,
      notFoundIds,
    };
  }
}
