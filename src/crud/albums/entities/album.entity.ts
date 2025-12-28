import { AlbumCoverEntity } from '@/crud/album-covers/entities/album-cover.entity';
import { NeuralNetworkEntity } from '@/crud/neural-networks/entities/neural-network.entity';
import { PhotoEntity } from '@/crud/photos/entities/photo.entity';
import { UserEntity } from '@/crud/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  publishedAt?: string;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  isFree: boolean;

  @ApiProperty()
  hasPaidContent: boolean;

  @ApiProperty({ type: () => PhotoEntity, isArray: true })
  photos: PhotoEntity[];

  @ApiProperty({ type: () => UserEntity, isArray: true })
  usersAddedToFavorites: UserEntity[];

  @ApiProperty({ type: () => AlbumCoverEntity })
  albumCover: AlbumCoverEntity;

  @ApiProperty({ type: () => NeuralNetworkEntity })
  neuralNetwork?: NeuralNetworkEntity;
}
