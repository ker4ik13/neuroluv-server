import { PartialType } from '@nestjs/swagger';
import { CreatePromptsCollectionDto } from './create-prompts-collection.dto';

export class UpdatePromptsCollectionDto extends PartialType(
  CreatePromptsCollectionDto,
) {}
