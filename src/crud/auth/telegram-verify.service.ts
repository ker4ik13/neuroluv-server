import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export type TelegramInitDataVerified = {
  userJson: string;
  authDate: number;
};

@Injectable()
export class TelegramVerifyService {
  verify(
    initData: string,
    botToken: string,
    maxAgeSeconds = 300,
  ): TelegramInitDataVerified | null {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return null;

    params.delete('hash');

    const pairs: string[] = [];
    params.forEach((value, key) => pairs.push(`${key}=${value}`));
    pairs.sort();
    const dataCheckString = pairs.join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (computedHash !== hash) return null;

    const authDateStr = params.get('auth_date');
    const userJson = params.get('user');

    if (!authDateStr || !userJson) return null;

    const authDate = Number(authDateStr);
    if (!Number.isFinite(authDate)) return null;

    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > maxAgeSeconds) return null;

    return { userJson, authDate };
  }
}
