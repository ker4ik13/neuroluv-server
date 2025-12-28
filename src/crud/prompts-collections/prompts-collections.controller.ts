import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromptsCollectionsService } from './prompts-collections.service';
import { CreatePromptsCollectionDto } from './dto/create-prompts-collection.dto';
import { UpdatePromptsCollectionDto } from './dto/update-prompts-collection.dto';

@Controller('prompts-collections')
export class PromptsCollectionsController {
  constructor(private readonly promptsCollectionsService: PromptsCollectionsService) {}

  @Post()
  create(@Body() createPromptsCollectionDto: CreatePromptsCollectionDto) {
    return this.promptsCollectionsService.create(createPromptsCollectionDto);
  }

  @Get()
  findAll() {
    return this.promptsCollectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promptsCollectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromptsCollectionDto: UpdatePromptsCollectionDto) {
    return this.promptsCollectionsService.update(+id, updatePromptsCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promptsCollectionsService.remove(+id);
  }
}
