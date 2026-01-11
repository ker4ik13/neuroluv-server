import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAlbumCoverDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  file: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  albumId?: number;
}
