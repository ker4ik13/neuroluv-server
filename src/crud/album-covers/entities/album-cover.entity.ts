import { ApiProperty } from '@nestjs/swagger';
import { CreateAlbumCoverDto } from '../dto/create-album-cover.dto';
import { IsInt, IsNumber } from 'class-validator';

export class AlbumCover extends CreateAlbumCoverDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: string;
}
