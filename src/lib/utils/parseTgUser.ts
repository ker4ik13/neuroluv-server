import type { TgWebAppUser } from '../types';

export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

export const parseTgUser = (userJson: string): TgWebAppUser => {
  const parsed: unknown = JSON.parse(userJson);

  if (!isRecord(parsed)) throw new Error('Telegram user is not an object');

  const id = parsed.id;
  if (typeof id !== 'number')
    throw new Error('Telegram user.id must be a number');

  // Вытаскиваем только нужные поля (и типизируем)
  const user: TgWebAppUser = {
    id,
    first_name: typeof parsed.first_name === 'string' ? parsed.first_name : '',
    last_name:
      typeof parsed.last_name === 'string' ? parsed.last_name : undefined,
    username: typeof parsed.username === 'string' ? parsed.username : undefined,
    language_code:
      typeof parsed.language_code === 'string'
        ? parsed.language_code
        : undefined,
    is_premium:
      typeof parsed.is_premium === 'boolean' ? parsed.is_premium : undefined,
    photo_url:
      typeof parsed.photo_url === 'string' ? parsed.photo_url : undefined,
  };

  return user;
};
