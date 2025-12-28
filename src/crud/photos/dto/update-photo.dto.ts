import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePhotoDto } from './create-photo.dto';
import { IsInt, IsNumber } from 'class-validator';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @ApiProperty()
  @IsInt()
  @IsNumber()
  id?: string;
}
