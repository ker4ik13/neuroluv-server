import { AlbumEntity } from '@/crud/albums/entities/album.entity';
import { StyleEntity } from '@/crud/styles/entities/style.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  ext: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsDate()
  publishedAt?: Date;

  @ApiProperty()
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty()
  @IsBoolean()
  isFree: boolean;

  @ApiProperty()
  @IsArray()
  albums: AlbumEntity[];

  @ApiProperty()
  @IsArray()
  styles: StyleEntity[];

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  neuralNetworkId?: number;
}
