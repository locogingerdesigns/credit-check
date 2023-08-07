import { Injectable } from '@nestjs/common';
import { CreditReportService } from './credit-report.service'; 
import { CreditScoreService } from './credit-score.service';

@Injectable()
export class CreditService {

  constructor(
    private creditReportService: CreditReportService,
    private creditScoreService: CreditScoreService
  ) {}

  async getCredit(requestData: any) {

    // Validate input data
    const validatedData = this.validateInput(requestData);
    
    try {
      // Call credit report API
      const report = await this.creditReportService.getReport(validatedData);

      // Call credit score API
      const score = await this.creditScoreService.getScore(validatedData);

      // Combine report and score
      const credit = {
        report: report,
        score: score  
      };

      return credit;

    } catch (error) {
      // Handle any errors
      throw error; 
    }

  }

  validateInput(data: any) {
    // Validate input data
    return data; 
  }

}
