import { Module } from '@nestjs/common';
import { NeuralNetworksService } from './neural-networks.service';
import { NeuralNetworksController } from './neural-networks.controller';

@Module({
  controllers: [NeuralNetworksController],
  providers: [NeuralNetworksService],
})
export class NeuralNetworksModule {}
