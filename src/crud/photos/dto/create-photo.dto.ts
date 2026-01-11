import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  file: number;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isFree: boolean;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  styles?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  albums?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  usersAddedToFavorites?: number[];

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  neuralNetworkId?: number;
}
