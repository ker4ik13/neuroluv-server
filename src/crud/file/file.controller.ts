import {
  Controller,
  Post,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Body,
  Get,
  UploadedFiles,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';

import { FilesInterceptor } from '@nestjs/platform-express';
import { PageDto, PageOptionsDto } from '@/lib/utils/pagination';
import { File, UserRole } from '@prisma/client';
import { DeleteFilesDto } from './dto/delete-files.dto';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Roles } from '@/common/decorators';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async getAll(@Body() pageOptions: PageOptionsDto): Promise<PageDto<File>> {
    return await this.fileService.getAllFiles(new PageOptionsDto(pageOptions));
  }

  @Post()
  @UseInterceptors(FilesInterceptor('photo'))
  async uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /\/(jpg|jpeg|png|webp|gif)$/,
            errorMessage: 'File type must be an image',
          }),
          new MaxFileSizeValidator({
            maxSize: 1000 * 1000 * 10,
            errorMessage: 'File size must be smaller then 10 mb',
          }),
        ],
      }),
    )
    photos: Express.Multer.File[],
    @Body() { type }: { type: 'photo' | 'cover' },
  ) {
    return await this.fileService.uploadPhotos(photos, type);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  async remove(@Body() deleteFilesDto: DeleteFilesDto) {
    return await this.fileService.removePhotos(deleteFilesDto);
  }
}
