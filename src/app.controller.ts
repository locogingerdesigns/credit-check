import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CredcoRequestDto } from './credit/dto/credco.dto';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post('credit-score')
  async getCreditScore(@Body() creditScoreRequest: CredcoRequestDto) {
    return this.appService.getCreditScore(creditScoreRequest);
  }

  @Post('credit-report')
  async getCreditReport(@Body() creditReportRequest: CredcoRequestDto) {
    return this.appService.getCreditReport(creditReportRequest);
  }
}
