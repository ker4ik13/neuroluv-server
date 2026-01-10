import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { isProd } from '@/lib/utils';
import { Cookie } from '@/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd(),
      sameSite: isProd() ? 'none' : 'lax',
      path: '/',
      maxAge: 30 * 60 * 1000, // 30m
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProd(),
      sameSite: isProd() ? 'none' : 'lax',
      path: '/api/auth/refresh',
      maxAge:
        Number(process.env.JWT_REFRESH_DAYS ?? '14') * 24 * 60 * 60 * 1000,
    });
  }

  @Post('telegram')
  async telegram(
    @Body() body: { initData: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.loginWithTelegram(body.initData);
    if (!result) throw new UnauthorizedException('Invalid Telegram initData');

    this.setAuthCookies(res, result.accessToken, result.refreshToken);

    // accessToken можно НЕ возвращать в body (он уже в cookie)
    return { user: result.user };
  }

  @Post('refresh')
  async refresh(
    @Cookie('refresh_token') refreshToken: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('Вы не авторизованы');
    }

    const result = await this.auth.refresh(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    this.setAuthCookies(res, result.accessToken, result.refreshToken);
    return { user: result.user };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token as string | undefined;
    await this.auth.logout(refreshToken);

    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/api/auth/refresh' });

    return { ok: true };
  }
}
