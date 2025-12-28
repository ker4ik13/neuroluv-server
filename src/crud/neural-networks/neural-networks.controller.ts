import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NeuralNetworksService } from './neural-networks.service';
import { CreateNeuralNetworkDto } from './dto/create-neural-network.dto';
import { UpdateNeuralNetworkDto } from './dto/update-neural-network.dto';
import type { NeuralNetwork } from '@prisma/client';
import { PageOptionsDto, type PageDto } from '@/lib/utils/pagination';

@Controller('neural-networks')
export class NeuralNetworksController {
  constructor(private readonly neuralNetworksService: NeuralNetworksService) {}

  @Post()
  create(@Body() createNeuralNetworkDto: CreateNeuralNetworkDto) {
    return this.neuralNetworksService.create(createNeuralNetworkDto);
  }

  @Get()
  findAll(
    @Query() pageOptions: PageOptionsDto,
  ): Promise<PageDto<NeuralNetwork>> {
    return this.neuralNetworksService.findAll(new PageOptionsDto(pageOptions));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.neuralNetworksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNeuralNetworkDto: UpdateNeuralNetworkDto,
  ) {
    return this.neuralNetworksService.update(+id, updateNeuralNetworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.neuralNetworksService.remove(+id);
  }
}
