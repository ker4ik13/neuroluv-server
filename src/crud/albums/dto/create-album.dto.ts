import { ApiProperty } from '@nestjs/swagger';
import {
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
  @IsBoolean()
  hasPaidContent: boolean;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  albumCoverId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  neuralNetworkId: number;
}
