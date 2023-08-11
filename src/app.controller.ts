import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CredcoRequestDto } from './credit/dto/credco.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('credit-score')
  async getCreditScore(@Body() credcoRequest: CredcoRequestDto) {
    const score = await this.appService.getCreditScore(credcoRequest);
    return { score };
  }

  @Post('credit-report')
  async getCreditReport(@Body() credcoRequest: CredcoRequestDto) {
    const report = await this.appService.getCreditReport(credcoRequest);
    return { report };
  }
}
