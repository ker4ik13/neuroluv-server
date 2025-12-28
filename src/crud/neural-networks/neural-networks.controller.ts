import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NeuralNetworksService } from './neural-networks.service';
import { CreateNeuralNetworkDto } from './dto/create-neural-network.dto';
import { UpdateNeuralNetworkDto } from './dto/update-neural-network.dto';

@Controller('neural-networks')
export class NeuralNetworksController {
  constructor(private readonly neuralNetworksService: NeuralNetworksService) {}

  @Post()
  create(@Body() createNeuralNetworkDto: CreateNeuralNetworkDto) {
    return this.neuralNetworksService.create(createNeuralNetworkDto);
  }

  @Get()
  findAll() {
    return this.neuralNetworksService.findAll();
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
