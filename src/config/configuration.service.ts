import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get apiUrl(): string {
    return this.configService.get<string>('API_URL');
  }

  get apiVersion(): string {
    return this.configService.get<string>('API_VERSION');
  }
}
