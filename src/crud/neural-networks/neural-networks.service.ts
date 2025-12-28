import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { NeuralNetwork, Prisma } from '@prisma/client';
import {
  generateMetaPage,
  PageOptionsDto,
  type PageDto,
} from '@/lib/utils/pagination';
import { DatabaseService } from '@/database';
import { CreateNeuralNetworkDto } from './dto/create-neural-network.dto';
import { UpdateNeuralNetworkDto } from './dto/update-neural-network.dto';

@Injectable()
export class NeuralNetworksService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    createNeuralNetworkDto: CreateNeuralNetworkDto,
  ): Promise<NeuralNetwork> {
    const isAlreadyHas = await this.database.neuralNetwork.findFirst({
      where: {
        OR: [
          {
            name: createNeuralNetworkDto.name,
          },
          {
            slug: createNeuralNetworkDto.slug,
          },
        ],
      },
    });

    if (isAlreadyHas) {
      throw new BadRequestException('Neural network is already exist');
    }

    return this.database.neuralNetwork.create({
      data: createNeuralNetworkDto,
    });
  }

  async findAll(pageOptions: PageOptionsDto): Promise<PageDto<NeuralNetwork>> {
    const search = pageOptions.search?.trim();

    const whereClause: Prisma.NeuralNetworkWhereInput | undefined = search
      ? {
          OR: [
            /^\d+$/.test(search) ? { id: Number(search) } : undefined,
            { name: { startsWith: search, mode: 'insensitive' } },
            { slug: { startsWith: search, mode: 'insensitive' } },
            { version: { startsWith: search, mode: 'insensitive' } },
          ].filter(Boolean) as Prisma.NeuralNetworkWhereInput[],
        }
      : undefined;

    const result = await this.database.neuralNetwork.findMany({
      where: whereClause,
      skip: pageOptions.skip,
      take: pageOptions.take,
      orderBy: { id: pageOptions.order },
      include: {
        _count: true,
      },
    });

    const itemsCount = await this.database.neuralNetwork.count({
      where: whereClause,
    });

    return generateMetaPage(result, itemsCount, pageOptions);
  }

  async findOne(id: number): Promise<NeuralNetwork> {
    const neuralNetwork = await this.database.neuralNetwork.findUnique({
      where: { id },
      include: {
        _count: true,
      },
    });

    if (!neuralNetwork) {
      throw new NotFoundException('Neural network not found');
    }

    return neuralNetwork;
  }

  async update(
    id: number,
    updateNeuralNetworkDto: UpdateNeuralNetworkDto,
  ): Promise<NeuralNetwork> {
    return this.database.neuralNetwork.update({
      where: { id },
      data: updateNeuralNetworkDto,
      include: {
        _count: true,
      },
    });
  }

  async remove(id: number): Promise<NeuralNetwork> {
    return this.database.neuralNetwork.delete({
      where: { id },
      include: {
        _count: true,
      },
    });
  }
}
