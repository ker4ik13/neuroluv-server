import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStyleDto } from './create-style.dto';
import { IsInt, IsNumber } from 'class-validator';

export class UpdateStyleDto extends PartialType(CreateStyleDto) {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: string;
}
