import { Module } from '@nestjs/common';
import { AlbumCoversService } from './album-covers.service';
import { AlbumCoversController } from './album-covers.controller';
import { DatabaseService } from '@/database';

@Module({
  controllers: [AlbumCoversController],
  providers: [AlbumCoversService, DatabaseService],
})
export class AlbumCoversModule {}
