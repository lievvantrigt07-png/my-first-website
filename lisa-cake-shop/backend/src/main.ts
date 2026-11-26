import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4173',
      'http://localhost:5173',
      'http://localhost:5500',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const expectedApiKey = process.env.API_KEY;
    const receivedApiKey = req.header('x-api-key');

    if (!expectedApiKey || receivedApiKey !== expectedApiKey) {
      res.status(401).json({
        message: 'Invalid or missing API key.',
      });
      return;
    }

    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000, '127.0.0.1');
}

bootstrap();
