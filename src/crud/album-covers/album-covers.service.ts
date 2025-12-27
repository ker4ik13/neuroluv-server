import { Injectable } from '@nestjs/common';
import { CreateAlbumCoverDto } from './dto/create-album-cover.dto';
import { UpdateAlbumCoverDto } from './dto/update-album-cover.dto';

@Injectable()
export class AlbumCoversService {
  create(createAlbumCoverDto: CreateAlbumCoverDto) {
    return 'This action adds a new albumCover';
  }

  findAll() {
    return `This action returns all albumCovers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} albumCover`;
  }

  update(id: number, updateAlbumCoverDto: UpdateAlbumCoverDto) {
    return `This action updates a #${id} albumCover`;
  }

  remove(id: number) {
    return `This action removes a #${id} albumCover`;
  }
}
