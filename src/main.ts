import { NestFactory } from '@nestjs/core';
import { HttpService } from '@nestjs/axios'; // Import HttpService
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Configure axios's base URL for Credco's API
  app.get(HttpService).axiosRef.defaults.baseURL = 'https://your-credco-api-base-url';

  // Start the application on port 3000
  await app.listen(3000);
}
bootstrap();
