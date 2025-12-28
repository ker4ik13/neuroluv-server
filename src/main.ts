import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Serialize telegram id (BigInt)
(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });

  const config = new DocumentBuilder()
    .setTitle('NeuroLuv API Documentation')
    .setDescription(
      'Документация API к Telegram Mini APP "NeuroLuv <a href="https://t.me/NeuroLuv" target="_blank">(@neuroluv)</a>"',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalInterceptors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
