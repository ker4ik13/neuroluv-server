import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
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

  @ApiProperty({ required: false, default: null })
  @IsDate()
  @IsOptional()
  publishedAt?: Date;

  @ApiProperty({
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isFree?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  hasPaidContent?: boolean;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  photos?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  usersAddedToFavorites?: number[];

  @ApiProperty({ required: true })
  @IsInt()
  @IsPositive()
  albumCover: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  neuralNetworkId: number;
}
