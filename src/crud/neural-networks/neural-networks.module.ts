import { Module } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { NeuralNetworksService } from './neural-networks.service';
import { NeuralNetworksController } from './neural-networks.controller';

@Module({
  controllers: [NeuralNetworksController],
  providers: [NeuralNetworksService, DatabaseService],
})
export class NeuralNetworksModule {}
