import { ApiProperty } from '@nestjs/swagger';
import type { Album, Style, User } from '@prisma/client';
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
  albums: Album[];

  @ApiProperty()
  @IsArray()
  styles: Style[];

  @ApiProperty()
  @IsArray()
  usersAddedToFavorites: User[];
}
