import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreditScoreModule } from './credit/credit-score.module';
import { CreditReportModule } from './credit/credit-report.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpModule,
    CreditScoreModule, 
    CreditReportModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
