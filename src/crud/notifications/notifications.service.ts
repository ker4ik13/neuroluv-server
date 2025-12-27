import { DatabaseService } from '@/database';
import { Notification } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor(private database: DatabaseService) {}

  async getAll() {
    return await this.database.notification.findMany();
  }
}
