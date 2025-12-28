import { PartialType } from '@nestjs/swagger';
import { AlbumEntity } from '../entities/album.entity';

export class UpdateAlbumDto extends PartialType(AlbumEntity) {}
