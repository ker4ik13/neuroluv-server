import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAlbumCoverDto } from './create-album-cover.dto';
import { IsInt, IsNumber } from 'class-validator';

export class UpdateAlbumCoverDto extends PartialType(CreateAlbumCoverDto) {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id?: string;
}
