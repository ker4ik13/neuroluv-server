import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UserRole, type Album } from '@prisma/client';
import { PageOptionsDto, type PageDto } from '@/lib/utils/pagination';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Public, Roles } from '@/common/decorators';

@UseGuards(JwtAuthGuard)
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @Public()
  async findAll(@Query() pageOptions: PageOptionsDto): Promise<PageDto<Album>> {
    return await this.albumsService.findAll(new PageOptionsDto(pageOptions));
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(+id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @UsePipes(new ValidationPipe())
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.create(createAlbumDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  remove(@Param('id') id: string) {
    return this.albumsService.remove(+id);
  }
}
