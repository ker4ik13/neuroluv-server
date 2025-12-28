import { ApiProperty } from '@nestjs/swagger';
import { CreateAlbumCoverDto } from '../dto/create-album-cover.dto';
import { IsInt, IsNumber } from 'class-validator';

export class AlbumCoverEntity extends CreateAlbumCoverDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: string;
}
