import { Injectable } from '@nestjs/common';
import { CreateNeuralNetworkDto } from './dto/create-neural-network.dto';
import { UpdateNeuralNetworkDto } from './dto/update-neural-network.dto';

@Injectable()
export class NeuralNetworksService {
  create(createNeuralNetworkDto: CreateNeuralNetworkDto) {
    return 'This action adds a new neuralNetwork';
  }

  findAll() {
    return `This action returns all neuralNetworks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} neuralNetwork`;
  }

  update(id: number, updateNeuralNetworkDto: UpdateNeuralNetworkDto) {
    return `This action updates a #${id} neuralNetwork`;
  }

  remove(id: number) {
    return `This action removes a #${id} neuralNetwork`;
  }
}
