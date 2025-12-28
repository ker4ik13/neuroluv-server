import { AlbumEntity } from '@/crud/albums/entities/album.entity';
import { PhotoEntity } from '@/crud/photos/entities/photo.entity';
import { PromptEntity } from '@/crud/prompts/entities/prompt.entity';
import { PromptsCollectionEntity } from '@/crud/prompts-collections/entities/prompts-collection.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  telegramId: bigint;

  @ApiProperty()
  firstName: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: false })
  userName?: string;

  @ApiProperty({ required: false })
  languageCode?: string;

  @ApiProperty()
  authDate: Date;

  @ApiProperty()
  lastSeenAt: Date;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role: UserRole;

  @ApiProperty()
  balance: number;

  @ApiProperty({ type: () => PhotoEntity, isArray: true })
  favoritePhotos: PhotoEntity[];

  @ApiProperty({ type: () => AlbumEntity, isArray: true })
  favoriteAlbums: AlbumEntity[];

  @ApiProperty({ type: () => PromptEntity, isArray: true })
  favoritePromts: PromptEntity[];

  @ApiProperty({ type: () => PromptsCollectionEntity, isArray: true })
  favoritePromtsCollections: PromptsCollectionEntity[];

  @ApiProperty({ isArray: true })
  notificationRecipients: string[];
}
