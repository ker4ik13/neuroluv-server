import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';

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
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsDate()
  publishedAt?: Date;

  @ApiProperty()
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty()
  @IsArray()
  albums: string[];

  @ApiProperty()
  @IsArray()
  styles: string[];

  @ApiProperty()
  @IsArray()
  usersAddedToFavorites: string[];
}
