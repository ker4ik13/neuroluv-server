import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users';
import { parseTgUser } from '@/lib/utils';
import { DatabaseService } from '@/database';
import { TelegramVerifyService } from './telegram-verify.service';
import * as crypto from 'crypto';
import type { JwtPayload } from '@/lib/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly tgVerifyService: TelegramVerifyService,
    private readonly databaseService: DatabaseService,
  ) {}

  private hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async loginWithTelegram(initData: string) {
    const botToken = process.env.TG_BOT_TOKEN!;
    const verified = this.tgVerifyService.verify(initData, botToken, 300);
    if (!verified) return null;

    const tgUser = parseTgUser(verified.userJson);

    const user = await this.usersService.upsert({
      telegramId: tgUser.id,
      firstName: tgUser.first_name,
      lastName: tgUser.last_name,
      languageCode: tgUser.language_code,
      userName: tgUser.username,
    });

    const telegramIdStr = user.telegramId.toString();

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id.toString(),
        telegramId: telegramIdStr,
        role: user.role,
      } satisfies JwtPayload,
      { secret: process.env.JWT_ACCESS_SECRET!, expiresIn: '30m' },
    );

    // refresh токен генерируем случайный (НЕ jwt), чтобы его нельзя было “подделать”
    const refreshToken = crypto.randomBytes(48).toString('base64url');
    const refreshHash = this.hashToken(refreshToken);

    const refreshDays = Number(process.env.JWT_REFRESH_DAYS ?? '14');
    const expiresAt = new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000);

    await this.databaseService.refreshToken.create({
      data: { userId: user.id, tokenHash: refreshHash, expiresAt },
    });

    return { user, accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const refreshHash = this.hashToken(refreshToken);

    const tokenRow = await this.databaseService.refreshToken.findUnique({
      where: { tokenHash: refreshHash },
      include: { user: true },
    });

    if (!tokenRow) return null;
    if (tokenRow.revokedAt) return null;
    if (tokenRow.expiresAt.getTime() < Date.now()) return null;

    // Ротация refresh: отзываем старый, создаем новый
    await this.databaseService.refreshToken.update({
      where: { id: tokenRow.id },
      data: { revokedAt: new Date() },
    });

    const newRefreshToken = crypto.randomBytes(48).toString('base64url');
    const newRefreshHash = this.hashToken(newRefreshToken);

    const refreshDays = Number(process.env.JWT_REFRESH_DAYS ?? '14');
    const expiresAt = new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000);

    await this.databaseService.refreshToken.create({
      data: { userId: tokenRow.userId, tokenHash: newRefreshHash, expiresAt },
    });

    const telegramIdStr = tokenRow.user.telegramId.toString();

    const accessToken = await this.jwtService.signAsync(
      {
        sub: tokenRow.userId.toString(),
        telegramId: telegramIdStr,
        role: tokenRow.user.role,
      } satisfies JwtPayload,
      { secret: process.env.JWT_ACCESS_SECRET!, expiresIn: '30m' },
    );

    const user = {
      id: tokenRow.user.id,
      telegramId: tokenRow.user.telegramId,
      username: tokenRow.user.userName,
      firstName: tokenRow.user.firstName,
      lastName: tokenRow.user.lastName,
    };

    return { user, accessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string | undefined) {
    if (!refreshToken) return;

    const refreshHash = this.hashToken(refreshToken);
    await this.databaseService.refreshToken.updateMany({
      where: { tokenHash: refreshHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
