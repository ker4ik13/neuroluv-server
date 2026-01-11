import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DatabaseService } from '@/database';

@Module({
  controllers: [FileController],
  providers: [FileService, DatabaseService],
})
export class FileModule {}
