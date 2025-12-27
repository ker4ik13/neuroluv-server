import { ConfigService } from '@nestjs/config';

export const isDev = (configService: ConfigService): boolean => {
  return configService.getOrThrow('NODE_ENV') === 'development';
};
