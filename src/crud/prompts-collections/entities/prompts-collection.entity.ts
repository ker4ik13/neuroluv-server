import { NeuralNetworkEntity } from '@/crud/neural-networks/entities/neural-network.entity';
import { UserEntity } from '@/crud/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PromptsCollectionEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    required: false,
  })
  publishedAt?: Date;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  hasPaidContent: boolean;

  @ApiProperty({
    type: () => UserEntity,
    isArray: true,
  })
  usersAddedToFavorites: UserEntity[];

  @ApiProperty({
    type: () => NeuralNetworkEntity,
  })
  neuralNetwork?: NeuralNetworkEntity;
}
