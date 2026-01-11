import { PartialType } from '@nestjs/swagger';
import { CreateAlbumCoverDto } from './create-album-cover.dto';

export class UpdateAlbumCoverDto extends PartialType(CreateAlbumCoverDto) {}
