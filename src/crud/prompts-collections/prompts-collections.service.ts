import { Injectable } from '@nestjs/common';
import { CreatePromptsCollectionDto } from './dto/create-prompts-collection.dto';
import { UpdatePromptsCollectionDto } from './dto/update-prompts-collection.dto';

@Injectable()
export class PromptsCollectionsService {
  create(createPromptsCollectionDto: CreatePromptsCollectionDto) {
    return 'This action adds a new promptsCollection';
  }

  findAll() {
    return `This action returns all promptsCollections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promptsCollection`;
  }

  update(id: number, updatePromptsCollectionDto: UpdatePromptsCollectionDto) {
    return `This action updates a #${id} promptsCollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} promptsCollection`;
  }
}
