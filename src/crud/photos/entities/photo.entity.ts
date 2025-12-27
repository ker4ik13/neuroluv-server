import { ApiProperty } from '@nestjs/swagger';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { IsInt, IsNumber } from 'class-validator';

export class Photo extends CreatePhotoDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: string;
}
