import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { CreditScoreService } from './credit-score.service';
import { CreditScoreRequestDto } from './dto/credit-score.dto';

@Controller('credit-score')
export class CreditScoreController {

  constructor(private creditScoreService: CreditScoreService) {}

  @Post()
  async getCreditScore(@Body() body: CreditScoreRequestDto) {
    
    const score = await this.creditScoreService.getScore(body);

    return {
      statusCode: HttpStatus.OK,  
      score: score
    };

  }

}
