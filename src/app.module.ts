import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './crud/notifications';
import { DatabaseModule } from './database';
import { UsersModule } from './crud/users';
import { PhotosModule } from './crud/photos';
import { AlbumsModule } from './crud/albums';
import { StylesModule } from './crud/styles';
import { AlbumCoversModule } from './crud/album-covers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    //   sortSchema: true,
    //   playground: isDev(new ConfigService()),
    // }),
    DatabaseModule,
    NotificationsModule,
    UsersModule,
    PhotosModule,
    AlbumsModule,
    StylesModule,
    AlbumCoversModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
