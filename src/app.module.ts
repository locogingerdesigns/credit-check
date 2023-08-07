import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CreditController } from './credit/credit.controller';
import { CreditReportController } from './credit/credit-report.controller';

@Module({
  imports: [],
  controllers: [
    AppController, 
    CreditController, 
    CreditReportController
  ],
  providers: [AppService],
})
export class AppModule {}
