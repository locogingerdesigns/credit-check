import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CreditReportService } from './credit-report.service';
import { CreditScoreService } from './credit-score.service';  
import { CreditService } from './credit.service';

@Controller('credit')
export class CreditController {

  constructor(
    private creditReportService: CreditReportService,
    private creditScoreService: CreditScoreService,  
    private creditService: CreditService
  ) {}

  @Post('v1/report')
  async getCreditReport(@Body() body) {
    const report = await this.creditReportService.getReport(body);
    
    return {
      statusCode: HttpStatus.OK,
      report: report
    };
  }

  @Post('v1/score')
  async getCreditScore(@Body() body) {
    const score = await this.creditScoreService.getScore(body);

    return {
      statusCode: HttpStatus.OK,
      score: score
    };
  }

  @Post()
  async getCredit(@Body() body) {
    const credit = await this.creditService.getCredit(body);
    
    return {
      statusCode: HttpStatus.OK,
      credit: credit
    };
  }

}
