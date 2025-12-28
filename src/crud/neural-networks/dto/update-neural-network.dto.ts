import { PartialType } from '@nestjs/swagger';
import { NeuralNetworkEntity } from '../entities/neural-network.entity';

export class UpdateNeuralNetworkDto extends PartialType(NeuralNetworkEntity) {}
