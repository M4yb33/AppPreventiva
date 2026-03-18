import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*', // In production, specify allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log('='.repeat(50));
  console.log('🚀 QuickCalc API Server');
  console.log('='.repeat(50));
  console.log(`📍 Server running on: http://0.0.0.0:${port}`);
  console.log(`🔗 API Base URL: http://0.0.0.0:${port}/api`);
  console.log(`📱 Mobile access: http://192.168.18.9:${port}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
}

bootstrap();
