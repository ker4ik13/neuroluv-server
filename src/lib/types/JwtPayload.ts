import type { UserRole } from '@prisma/client';

export type JwtPayload = { sub: string; telegramId: string; role: UserRole };
