import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from '@/crud/albums/entities/album.entity';

export class AlbumCoverEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ext: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => AlbumEntity })
  album: AlbumEntity;
}
