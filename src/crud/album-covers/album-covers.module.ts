import { Module } from '@nestjs/common';
import { AlbumCoversService } from './album-covers.service';
import { AlbumCoversController } from './album-covers.controller';

@Module({
  controllers: [AlbumCoversController],
  providers: [AlbumCoversService],
})
export class AlbumCoversModule {}
