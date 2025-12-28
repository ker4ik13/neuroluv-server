import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';
import { IsInt, IsNumber } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id?: string;
}
