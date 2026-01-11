import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromptsCollectionDto } from './dto/create-prompts-collection.dto';
import { UpdatePromptsCollectionDto } from './dto/update-prompts-collection.dto';
import {
  generateMetaPage,
  PageDto,
  PageOptionsDto,
} from '@/lib/utils/pagination';
import { DatabaseService } from '@/database';
import { Prisma, PromptsCollection } from '@prisma/client';

@Injectable()
export class PromptsCollectionsService {
  constructor(private readonly database: DatabaseService) {}
  async findAll(
    pageOptions: PageOptionsDto,
  ): Promise<PageDto<PromptsCollection>> {
    const search = pageOptions.search?.trim();

    const whereClause: Prisma.PromptsCollectionWhereInput | undefined = search
      ? {
          OR: [
            /^\d+$/.test(search) ? { id: Number(search) } : undefined,
            { name: { startsWith: search, mode: 'insensitive' } },
            { slug: { startsWith: search, mode: 'insensitive' } },
            { description: { startsWith: search, mode: 'insensitive' } },
          ].filter(Boolean) as Prisma.PromptsCollectionWhereInput[],
        }
      : undefined;

    const result = await this.database.promptsCollection.findMany({
      where: whereClause,
      skip: pageOptions.skip,
      take: pageOptions.take,
      orderBy: { id: pageOptions.order },
      include: {
        neuralNetwork: true,
        _count: true,
      },
    });

    const itemsCount = await this.database.promptsCollection.count({
      where: whereClause,
    });

    return generateMetaPage(result, itemsCount, pageOptions);
  }

  async findOne(id: number): Promise<PromptsCollection> {
    const result = await this.database.promptsCollection.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        usersAddedToFavorites: true,
        neuralNetwork: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Prompt collection not found');
    }

    return result;
  }

  async create(createPromptsCollectionDto: CreatePromptsCollectionDto) {
    const { usersAddedToFavorites, prompts, neuralNetworkId, ...data } =
      createPromptsCollectionDto;

    const newPromptCollection = await this.database.promptsCollection.upsert({
      where: {
        slug: createPromptsCollectionDto.slug,
      },
      create: {
        ...data,
        ...(data.isPublished === true
          ? {
              publishedAt: new Date().toISOString(),
            }
          : {
              publishedAt: null,
            }),
        neuralNetwork: { connect: { id: neuralNetworkId } },
        ...(usersAddedToFavorites && {
          usersAddedToFavorites: {
            connect: usersAddedToFavorites.map((id) => ({ id })),
          },
        }),
        ...(prompts &&
          prompts.length !== 0 && {
            prompts: {
              connect: prompts.map((id) => ({ id })),
            },
          }),
      },
      update: {
        ...data,
        ...(data.isPublished === true
          ? {
              publishedAt: new Date().toISOString(),
            }
          : {
              publishedAt: null,
            }),
        ...(neuralNetworkId && {
          neuralNetwork: {
            connect: {
              id: neuralNetworkId,
            },
          },
        }),
        ...(usersAddedToFavorites && {
          usersAddedToFavorites: {
            connect: usersAddedToFavorites.map((userId) => ({ id: userId })),
          },
        }),
        ...(prompts &&
          prompts.length !== 0 && {
            prompts: {
              connect: prompts.map((id) => ({ id })),
            },
          }),
      },
      include: {
        neuralNetwork: true,
        prompts: true,
      },
    });
    return newPromptCollection;
  }

  async update(
    id: number,
    updatePromptsCollectionDto: UpdatePromptsCollectionDto,
  ) {
    const { usersAddedToFavorites, prompts, neuralNetworkId, ...data } =
      updatePromptsCollectionDto;

    const newPromptCollection = await this.database.promptsCollection.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        ...(data.isPublished === true
          ? {
              publishedAt: new Date().toISOString(),
            }
          : {
              publishedAt: null,
            }),
        ...(neuralNetworkId && {
          neuralNetwork: {
            connect: {
              id: neuralNetworkId,
            },
          },
        }),
        ...(usersAddedToFavorites && {
          usersAddedToFavorites: {
            connect: usersAddedToFavorites.map((userId) => ({ id: userId })),
          },
        }),
        ...(prompts &&
          prompts.length !== 0 && {
            prompts: {
              connect: prompts.map((id) => ({ id })),
            },
          }),
      },
      include: {
        neuralNetwork: true,
        prompts: {
          include: {
            _count: true,
          },
        },
        _count: true,
      },
    });
    return newPromptCollection;
  }

  async remove(id: number): Promise<PromptsCollection> {
    const result = await this.database.promptsCollection.delete({
      where: {
        id,
      },
      include: {
        _count: true,
        usersAddedToFavorites: true,
        neuralNetwork: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Prompt collection not found');
    }

    return result;
  }
}
