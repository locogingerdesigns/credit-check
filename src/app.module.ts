import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreditModule } from './credit/credit.module';
import { CreditService } from './credit/credit.service'; // Import CreditService here
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpModule,
    CreditModule,
  ],
  controllers: [AppController],
  providers: [AppService, CreditService], // Add CreditService to the providers array
})
export class AppModule {}
