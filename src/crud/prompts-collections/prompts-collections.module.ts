import { Module } from '@nestjs/common';
import { PromptsCollectionsService } from './prompts-collections.service';
import { PromptsCollectionsController } from './prompts-collections.controller';
import { DatabaseService } from '@/database';

@Module({
  controllers: [PromptsCollectionsController],
  providers: [PromptsCollectionsService, DatabaseService],
})
export class PromptsCollectionsModule {}
