import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { CreatePromptDto } from './dto/create-prompt.dto';
import type { UpdatePromptDto } from './dto/update-prompt.dto';
import type { Prisma, Prompt } from '@prisma/client';
import { DatabaseService } from '@/database';
import {
  generateMetaPage,
  type PageDto,
  type PageOptionsDto,
} from '@/lib/utils/pagination';

@Injectable()
export class PromptsService {
  constructor(private readonly database: DatabaseService) {}

  async create(createPromptDto: CreatePromptDto): Promise<Prompt> {
    try {
      const { usersAddedToFavorites, neuralNetworkId, ...promptData } =
        createPromptDto;

      return await this.database.prompt.create({
        data: {
          ...promptData,
          neuralNetwork: { connect: { id: neuralNetworkId } },
          ...(usersAddedToFavorites && {
            usersAddedToFavorites: {
              connect: usersAddedToFavorites.map((id) => ({ id })),
            },
          }),
        },
        include: {
          neuralNetwork: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(pageOptions: PageOptionsDto): Promise<PageDto<Prompt>> {
    const search = pageOptions.search?.trim();

    const whereClause: Prisma.PromptWhereInput | undefined = search
      ? {
          OR: [
            /^\d+$/.test(search) ? { id: Number(search) } : undefined,
            { name: { startsWith: search, mode: 'insensitive' } },
            { slug: { startsWith: search, mode: 'insensitive' } },
            { description: { startsWith: search, mode: 'insensitive' } },
          ].filter(Boolean) as Prisma.PromptWhereInput[],
        }
      : undefined;

    const result = await this.database.prompt.findMany({
      where: whereClause,
      skip: pageOptions.skip,
      take: pageOptions.take,
      orderBy: { id: pageOptions.order },
      include: {
        neuralNetwork: true,
        _count: true,
      },
    });

    const itemsCount = await this.database.prompt.count({
      where: whereClause,
    });

    return generateMetaPage(result, itemsCount, pageOptions);
  }

  async findOne(id: number): Promise<Prompt> {
    const result = await this.database.prompt.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        neuralNetwork: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Prompt not found');
    }

    return result;
  }

  async update(id: number, updatePromptDto: UpdatePromptDto) {
    const { usersAddedToFavorites, neuralNetworkId, ...promptData } =
      updatePromptDto;

    const result = await this.database.prompt.update({
      where: {
        id,
      },
      data: {
        ...promptData,
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
        // TODO: добавить связи с users
      },

      include: {
        neuralNetwork: true,
        _count: true,
      },
    });
    return result;
  }

  async remove(id: number): Promise<Prompt> {
    const result = await this.database.prompt.delete({
      where: {
        id,
      },
      include: {
        _count: true,
        neuralNetwork: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Prompt not found');
    }

    return result;
  }
}
