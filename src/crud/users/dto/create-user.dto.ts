import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { UserRoles } from '../entities/user-roles.enum';
import { Photo } from '@/crud/photos';

export class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  telegramId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  languageCode?: string;

  @ApiProperty()
  @IsDate()
  authDate: Date;

  @ApiProperty()
  @IsDate()
  lastSeenAt: Date;

  @ApiProperty()
  @IsString()
  @IsEnum(UserRoles)
  role: UserRoles;

  @ApiProperty()
  @IsNumber()
  balance: number;

  // TODO: доделать тип с фото
  @ApiProperty()
  @IsArray()
  favoritePhotos: Photo[];

  @ApiProperty()
  @IsArray()
  favoriteAlbums: string[];

  @ApiProperty()
  @IsArray()
  notificationRecipients: string[];
}
