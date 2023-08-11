import { Module } from '@nestjs/common';
import { CreditScoreModule } from './credit/credit-score.module';
import { CreditReportModule } from './credit/credit-report.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CreditScoreModule, 
    CreditReportModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
