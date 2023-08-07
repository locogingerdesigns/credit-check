import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CreditScoreService {

  constructor(private httpService: HttpService) {}

  async getScore(ssn: string) {

    const response = await this.httpService.get('https://creditscoreapi.com/score', {
      params: {
        ssn: ssn  
      }
    }).toPromise();

    const score = response.data.score;
    
    return this.transformScore(score);

  }

  transformScore(rawScore: number) {
    // transform score
    return rawScore;
  }

}
