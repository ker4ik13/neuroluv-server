import { ApiProperty } from '@nestjs/swagger';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { IsInt, IsNumber } from 'class-validator';

export class PhotoEntity extends CreatePhotoDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: string;
}
