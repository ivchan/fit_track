import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authMiddlewareInstance = app.get(AuthMiddleware);
  app.use(authMiddlewareInstance.use.bind(authMiddlewareInstance));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
