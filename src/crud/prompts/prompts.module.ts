import { Module } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { DatabaseService } from '@/database';

@Module({
  controllers: [PromptsController],
  providers: [PromptsService, DatabaseService],
})
export class PromptsModule {}
