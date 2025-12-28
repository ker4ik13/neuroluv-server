import { PartialType } from '@nestjs/swagger';
import { AlbumCoverEntity } from '../entities/album-cover.entity';

export class UpdateAlbumCoverDto extends PartialType(AlbumCoverEntity) {}
