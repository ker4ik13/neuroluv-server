import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users';
import { JwtStrategy } from '@/common/strategies';
import { DatabaseService } from '@/database';
import { PassportModule } from '@nestjs/passport';
import { TelegramVerifyService } from './telegram-verify.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES', '30m'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TelegramVerifyService, DatabaseService],
})
export class AuthModule {}
