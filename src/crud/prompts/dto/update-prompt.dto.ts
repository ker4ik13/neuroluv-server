import { PartialType } from '@nestjs/swagger';
import { PromptEntity } from '../entities/prompt.entity';

export class UpdatePromptDto extends PartialType(PromptEntity) {}
