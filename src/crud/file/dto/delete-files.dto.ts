import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsOptional, IsPositive } from 'class-validator';

export class DeleteFilesDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  ids: number[];

  @ApiProperty({ required: false, enum: ['photo', 'cover'], default: 'photo' })
  @IsOptional()
  @IsIn(['photo', 'cover'])
  type?: 'photo' | 'cover';
}
