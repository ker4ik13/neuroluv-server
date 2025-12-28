import { ApiProperty } from '@nestjs/swagger';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { IsInt, IsNumber } from 'class-validator';

export class AlbumEntity extends CreateAlbumDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: string;
}
