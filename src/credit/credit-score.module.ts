import { Module } from '@nestjs/common';
import { CreditScoreService } from './credit-score.service';
import { CreditScoreController } from './credit-score.controller';

@Module({
  providers: [CreditScoreService],
  controllers: [CreditScoreController],
})
export class CreditScoreModule {}