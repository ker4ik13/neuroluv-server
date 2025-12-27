import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumCoversService } from './album-covers.service';
import { CreateAlbumCoverDto } from './dto/create-album-cover.dto';
import { UpdateAlbumCoverDto } from './dto/update-album-cover.dto';

@Controller('album-covers')
export class AlbumCoversController {
  constructor(private readonly albumCoversService: AlbumCoversService) {}

  @Post()
  create(@Body() createAlbumCoverDto: CreateAlbumCoverDto) {
    return this.albumCoversService.create(createAlbumCoverDto);
  }

  @Get()
  findAll() {
    return this.albumCoversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumCoversService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumCoverDto: UpdateAlbumCoverDto,
  ) {
    return this.albumCoversService.update(+id, updateAlbumCoverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumCoversService.remove(+id);
  }
}
