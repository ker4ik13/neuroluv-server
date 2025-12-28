import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from '@/crud/albums/entities/album.entity';
import { StyleEntity } from '@/crud/styles/entities/style.entity';
import { UserEntity } from '@/crud/users/entities/user.entity';
import { NeuralNetworkEntity } from '@/crud/neural-networks/entities/neural-network.entity';

export class PhotoEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  ext: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  prompt: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  publishedAt: Date;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  isFree: boolean;

  @ApiProperty({ type: () => AlbumEntity, isArray: true })
  albums: AlbumEntity[];

  @ApiProperty({ type: () => StyleEntity, isArray: true })
  styles: StyleEntity[];

  @ApiProperty({ type: () => UserEntity, isArray: true })
  usersAddedToFavorites: UserEntity[];

  @ApiProperty({ type: () => NeuralNetworkEntity })
  neuralNetwork: NeuralNetworkEntity;
}
