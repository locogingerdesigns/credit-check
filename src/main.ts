import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpService } from '@nestjs/axios';
import { CredcoRequestDto } from './credit/dto/credco.dto'; // Import CredcoRequestDto
import { AppService } from './app.service'; // Import AppService
import { create } from 'xmlbuilder2';
import { XmlBuilderMiddleware } from './xml-builder.middleware';

async function bootstrap() {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Get the HttpService instance
  const httpService = app.get(HttpService);

  // Configure axios's base URL for Credco's API
  httpService.axiosRef.defaults.baseURL = 'https://your-credco-api-base-url';

  // Set up the XML builder
  const xmlBuilder = create;

  // Configure the XML builder instance globally
  app.use(XmlBuilderMiddleware);

  await app.listen(3000);
}
bootstrap();
