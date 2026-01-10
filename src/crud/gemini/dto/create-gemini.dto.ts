import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateGeminiDto {
  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  negativePrompt?: string;

  @ApiProperty({ default: '1:1', enum: ['1:1', '3:4', '4:3', '9:16', '16:9'] })
  @IsString()
  aspectRatio?: string;
}
