import type { PhotoEntity } from '@/crud/photos';
import { UserEntity } from '@/crud/users';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty()
  @IsDate()
  publishedAt?: Date;

  @ApiProperty({
    default: false,
  })
  @IsBoolean()
  isPublished?: boolean;

  @ApiProperty()
  @IsBoolean()
  isFree: boolean;

  @ApiProperty()
  @IsArray()
  photos: PhotoEntity[];

  @ApiProperty()
  @IsArray()
  usersAddedToFavorites: UserEntity[];

  // TODO: доделать
  @ApiProperty()
  @IsString()
  albumCover: string;
}
