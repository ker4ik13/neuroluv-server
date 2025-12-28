import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import type { Prompt } from '@prisma/client';
import { PageOptionsDto, type PageDto } from '@/lib/utils/pagination';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Get()
  async findAll(
    @Query() pageOptions: PageOptionsDto,
  ): Promise<PageDto<Prompt>> {
    return await this.promptsService.findAll(new PageOptionsDto(pageOptions));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promptsService.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPromptDto: CreatePromptDto): Promise<Prompt> {
    return await this.promptsService.create(createPromptDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto) {
    return this.promptsService.update(+id, updatePromptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promptsService.remove(+id);
  }
}
