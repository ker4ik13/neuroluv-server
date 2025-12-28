import { PartialType } from '@nestjs/swagger';
import { PhotoEntity } from '../entities/photo.entity';

export class UpdatePhotoDto extends PartialType(PhotoEntity) {}
