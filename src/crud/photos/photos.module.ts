import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { DatabaseService } from '@/database';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, DatabaseService],
})
export class PhotosModule {}
