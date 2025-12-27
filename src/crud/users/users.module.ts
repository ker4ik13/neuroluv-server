import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from '@/database';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabaseService],
})
export class UsersModule {}
