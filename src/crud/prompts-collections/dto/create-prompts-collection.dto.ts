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

export class CreatePromptsCollectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isPublished: boolean;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  publishedAt?: Date;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isFree: boolean;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  hasPaidContent: boolean;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  usersAddedToFavorites?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  prompts?: number[];

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  neuralNetworkId?: number;
}
