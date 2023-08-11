import { Module } from '@nestjs/common';
import { CreditScoreModule } from './credit/credit-score.module';
import { CreditReportModule } from './credit/credit-report.module';

@Module({
  imports: [CreditScoreModule, CreditReportModule],
})
export class AppModule {}