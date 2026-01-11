import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PromptsCollectionsService } from './prompts-collections.service';
import { CreatePromptsCollectionDto } from './dto/create-prompts-collection.dto';
import { UpdatePromptsCollectionDto } from './dto/update-prompts-collection.dto';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Public, Roles } from '@/common/decorators';
import { PromptsCollection, UserRole } from '@prisma/client';
import { PageDto, PageOptionsDto } from '@/lib/utils/pagination';

@UseGuards(JwtAuthGuard)
@Controller('prompts-collections')
export class PromptsCollectionsController {
  constructor(
    private readonly promptsCollectionsService: PromptsCollectionsService,
  ) {}

  @Get()
  @Public()
  findAll(
    @Query() pageOptions: PageOptionsDto,
  ): Promise<PageDto<PromptsCollection>> {
    return this.promptsCollectionsService.findAll(
      new PageOptionsDto(pageOptions),
    );
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.promptsCollectionsService.findOne(+id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  create(@Body() createPromptsCollectionDto: CreatePromptsCollectionDto) {
    return this.promptsCollectionsService.create(createPromptsCollectionDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  update(
    @Param('id') id: string,
    @Body() updatePromptsCollectionDto: UpdatePromptsCollectionDto,
  ) {
    return this.promptsCollectionsService.update(
      +id,
      updatePromptsCollectionDto,
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  remove(@Param('id') id: string) {
    return this.promptsCollectionsService.remove(+id);
  }
}
