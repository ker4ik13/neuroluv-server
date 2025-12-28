import { PartialType } from '@nestjs/swagger';
import { CreateNeuralNetworkDto } from './create-neural-network.dto';

export class UpdateNeuralNetworkDto extends PartialType(
  CreateNeuralNetworkDto,
) {}
