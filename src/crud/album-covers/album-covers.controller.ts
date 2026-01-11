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
import { AlbumCoversService } from './album-covers.service';
import { CreateAlbumCoverDto } from './dto/create-album-cover.dto';
import { UpdateAlbumCoverDto } from './dto/update-album-cover.dto';
import { UserRole, type AlbumCover } from '@prisma/client';
import { PageOptionsDto, type PageDto } from '@/lib/utils/pagination';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Public, Roles } from '@/common/decorators';

@UseGuards(JwtAuthGuard)
@Controller('album-covers')
export class AlbumCoversController {
  constructor(private readonly albumCoversService: AlbumCoversService) {}

  @Get()
  @Public()
  async findAll(
    @Query() pageOptions: PageOptionsDto,
  ): Promise<PageDto<AlbumCover>> {
    return await this.albumCoversService.findAll(
      new PageOptionsDto(pageOptions),
    );
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.albumCoversService.findOne(+id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createAlbumCoverDto: CreateAlbumCoverDto,
  ): Promise<AlbumCover> {
    return await this.albumCoversService.create(createAlbumCoverDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  update(
    @Param('id') id: string,
    @Body() updateAlbumCoverDto: UpdateAlbumCoverDto,
  ) {
    return this.albumCoversService.update(+id, updateAlbumCoverDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  remove(@Param('id') id: string) {
    return this.albumCoversService.remove(+id);
  }
}
