import { AlbumEntity } from '@/crud/albums';
import { PhotoEntity } from '@/crud/photos';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'Telegram user identifier',
    type: String,
    example: '123456789',
  })
  telegramId: bigint;

  @ApiProperty()
  firstName: string;

  @ApiProperty({ required: false })
  lastName?: string | null;

  @ApiProperty({ required: false })
  userName?: string | null;

  @ApiProperty({ required: false })
  languageCode?: string | null;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role: UserRole;

  @ApiProperty()
  authDate: Date;

  @ApiProperty()
  lastSeenAt: Date;

  @ApiProperty()
  balance: number;

  @ApiProperty({ type: PhotoEntity, isArray: true })
  favoritePhotos: PhotoEntity[];

  @ApiProperty({ type: AlbumEntity, isArray: true })
  favoriteAlbums: AlbumEntity[];

  @ApiProperty({ isArray: true })
  notificationRecipients: string[];
}
