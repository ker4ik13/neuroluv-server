import { ApiProperty } from '@nestjs/swagger';
import { CreateStyleDto } from '../dto/create-style.dto';
import { IsInt, IsNumber } from 'class-validator';

export class Style extends CreateStyleDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: string;
}
