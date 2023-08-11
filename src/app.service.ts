import { Injectable } from '@nestjs/common';
import { CreditScoreService } from './credit/credit-score.service';
import { CreditReportService } from './credit/credit-report.service';
import { CredcoRequestDto } from './credit/dto/credco.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly creditScoreService: CreditScoreService,
    private readonly creditReportService: CreditReportService,
  ) {}

  async getCreditScore(credcoRequest: CredcoRequestDto) {
    const score = await this.creditScoreService.getScore(credcoRequest);
    return score;
  }

  async getCreditReport(credcoRequest: CredcoRequestDto) {
    const report = await this.creditReportService.getReport(credcoRequest);
    return report;
  }
}
