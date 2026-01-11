import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { UsersModule } from './crud/users';
import { PhotosModule } from './crud/photos';
import { AlbumsModule } from './crud/albums';
import { StylesModule } from './crud/styles';
import { AlbumCoversModule } from './crud/album-covers';
import { NeuralNetworksModule } from './crud/neural-networks';
import { PromptsModule } from './crud/prompts';
import { PromptsCollectionsModule } from './crud/prompts-collections';
import { GeminiModule } from './crud/gemini';
import { AuthModule } from './crud/auth';
import { FileModule } from './crud/file';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'photos'),
      serveRoot: '/static',
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    //   sortSchema: true,
    //   playground: isDev(),
    // }),
    DatabaseModule,
    UsersModule,
    PhotosModule,
    AlbumsModule,
    StylesModule,
    AlbumCoversModule,
    NeuralNetworksModule,
    PromptsModule,
    PromptsCollectionsModule,
    GeminiModule,
    AuthModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
