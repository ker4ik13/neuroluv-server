// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import type { Request } from 'express';
import type { JwtPayload } from '@/lib/types';

function cookieExtractor(req: Request): string | null {
  const token: unknown = req.cookies?.access_token;
  return typeof token === 'string' ? token : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.SECRET_KEY!,
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      telegramId: payload.telegramId,
      role: payload.role,
    };
  }
}
