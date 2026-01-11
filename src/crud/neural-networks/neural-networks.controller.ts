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
} from '@nestjs/common';
import { NeuralNetworksService } from './neural-networks.service';
import { CreateNeuralNetworkDto } from './dto/create-neural-network.dto';
import { UpdateNeuralNetworkDto } from './dto/update-neural-network.dto';
import { UserRole, type NeuralNetwork } from '@prisma/client';
import { PageOptionsDto, type PageDto } from '@/lib/utils/pagination';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Public, Roles } from '@/common/decorators';

@UseGuards(JwtAuthGuard)
@Controller('neural-networks')
export class NeuralNetworksController {
  constructor(private readonly neuralNetworksService: NeuralNetworksService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  create(@Body() createNeuralNetworkDto: CreateNeuralNetworkDto) {
    return this.neuralNetworksService.create(createNeuralNetworkDto);
  }

  @Get()
  @Public()
  findAll(
    @Query() pageOptions: PageOptionsDto,
  ): Promise<PageDto<NeuralNetwork>> {
    return this.neuralNetworksService.findAll(new PageOptionsDto(pageOptions));
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.neuralNetworksService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  update(
    @Param('id') id: string,
    @Body() updateNeuralNetworkDto: UpdateNeuralNetworkDto,
  ) {
    return this.neuralNetworksService.update(+id, updateNeuralNetworkDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  remove(@Param('id') id: string) {
    return this.neuralNetworksService.remove(+id);
  }
}
