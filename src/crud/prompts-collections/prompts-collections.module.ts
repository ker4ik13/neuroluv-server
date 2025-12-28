import { Module } from '@nestjs/common';
import { PromptsCollectionsService } from './prompts-collections.service';
import { PromptsCollectionsController } from './prompts-collections.controller';

@Module({
  controllers: [PromptsCollectionsController],
  providers: [PromptsCollectionsService],
})
export class PromptsCollectionsModule {}
