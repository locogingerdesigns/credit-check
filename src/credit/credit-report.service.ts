import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CreditReportService {

  constructor(private httpService: HttpService) {}

  async getReport(ssn: string) {

    try {

      const response = await this.httpService.get('https://creditreportapi.com', {
        params: {
          ssn: ssn
        }
      }).toPromise();

      const report = this.transformReport(response.data);
      
      return report;

    } catch (error) {
      throw new Error('Error getting credit report'); 
    }

  }

  transformReport(report: any) {
    // transform report data
    return report;
  }

}
