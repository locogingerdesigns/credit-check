import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CreditScoreService } from './credit-score.service';

@Controller('credit-score')
export class CreditScoreController {

  constructor(private creditScoreService: CreditScoreService) {}

  @Post()
  async getCreditScore(@Body() body) {
    
    const score = await this.creditScoreService.getScore(body);

    return {
      statusCode: HttpStatus.OK,  
      score: score
    };

  }

}
