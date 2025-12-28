import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageDto, PageMetaDto, PageOptionsDto } from '@/lib/utils/pagination';
import { User } from '@prisma/client';
import { Order } from '@/lib/common';
import { UserEntity } from './entities/user.entity';

@ApiTags('Users')
@ApiExtraModels(PageDto, PageMetaDto, UserEntity)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать/обновить пользователя по telegramId' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiCreatedResponse({ type: UserEntity })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список пользователей с пагинацией' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер страницы (>= 1)',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Размер страницы (1-50)',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: Order,
    description: 'Порядок сортировки по id',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description:
      'Поиск по telegramId, firstName/lastName, userName или полному имени',
  })
  @ApiOkResponse({
    description: 'Список пользователей с метаданными пагинации',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PageDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(UserEntity) },
            },
          },
        },
      ],
    },
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return await this.usersService.findAll(new PageOptionsDto(pageOptionsDto));
  }

  @Get(':telegramId')
  @ApiOperation({ summary: 'Получить пользователя по telegramId' })
  @ApiParam({
    name: 'telegramId',
    type: Number,
    description: 'Telegram user id',
  })
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('telegramId') telegramId: string): Promise<User> {
    return this.usersService.findOne(+telegramId);
  }

  @Patch(':telegramId')
  @ApiOperation({ summary: 'Обновить пользователя (WIP)' })
  @ApiParam({
    name: 'telegramId',
    type: Number,
    description: 'Telegram user id',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  update(
    @Param('telegramId') telegramId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+telegramId, updateUserDto);
  }

  @Delete(':telegramId')
  @ApiOperation({ summary: 'Удалить пользователя (WIP)' })
  @ApiParam({
    name: 'telegramId',
    type: Number,
    description: 'Telegram user id',
  })
  remove(@Param('telegramId') telegramId: string): Promise<User | null> {
    return this.usersService.remove(+telegramId);
  }
}
