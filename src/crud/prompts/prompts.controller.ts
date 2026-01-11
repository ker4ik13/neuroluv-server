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
  UseGuards,
} from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { UserRole, type Prompt } from '@prisma/client';
import { PageOptionsDto, type PageDto } from '@/lib/utils/pagination';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Public, Roles } from '@/common/decorators';

@UseGuards(JwtAuthGuard)
@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Get()
  @Public()
  async findAll(
    @Query() pageOptions: PageOptionsDto,
  ): Promise<PageDto<Prompt>> {
    return await this.promptsService.findAll(new PageOptionsDto(pageOptions));
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.promptsService.findOne(+id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @UsePipes(new ValidationPipe())
  async create(@Body() createPromptDto: CreatePromptDto): Promise<Prompt> {
    return await this.promptsService.create(createPromptDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto) {
    return this.promptsService.update(+id, updatePromptDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  remove(@Param('id') id: string) {
    return this.promptsService.remove(+id);
  }
}
