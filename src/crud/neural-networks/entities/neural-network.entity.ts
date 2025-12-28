import { ApiProperty } from '@nestjs/swagger';
import { PhotoEntity } from '@/crud/photos/entities/photo.entity';
import { AlbumEntity } from '@/crud/albums/entities/album.entity';
import { PromptEntity } from '@/crud/prompts/entities/prompt.entity';
import { PromptsCollectionEntity } from '@/crud/prompts-collections/entities/prompts-collection.entity';

export class NeuralNetworkEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  version: string;

  @ApiProperty({
    type: () => PhotoEntity,
    isArray: true,
  })
  photos: PhotoEntity[];

  @ApiProperty({
    type: () => AlbumEntity,
    isArray: true,
  })
  albums: AlbumEntity[];

  @ApiProperty({
    type: () => PromptEntity,
    isArray: true,
  })
  prompts: PromptEntity[];

  @ApiProperty({
    type: () => PromptsCollectionEntity,
    isArray: true,
  })
  promptsCollection: PromptsCollectionEntity[];
}
