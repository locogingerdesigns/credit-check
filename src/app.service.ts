import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreditScoreService } from './credit/credit-score.service';
import { CredcoRequestDto } from './credit/dto/credco.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly creditScoreService: CreditScoreService, // Inject the CreditScoreService
  ) {}

  async getCreditScore(creditScoreRequest: CredcoRequestDto): Promise<any> {
    try {
      const xmlPayload = this.creditScoreService.buildRequestBody(creditScoreRequest);

      this.logger.debug('Constructed XML payload for Credco API:', xmlPayload);

      const credcoApiEndpoint = 'https://credco-api-endpoint.com'; // Replace with actual endpoint
      const credcoResponse = await this.httpService
        .post(credcoApiEndpoint, xmlPayload, {
          headers: { 'Content-Type': 'application/xml' },
        })
        .toPromise();

      this.logger.debug('Credco API response:', credcoResponse.data);

      // Process the Credco API response as needed
      // ...

      return credcoResponse.data;
    } catch (error) {
      this.logger.error('Error processing data:', error.message);
      throw new Error('Error processing data');
    }
  }

  async getCreditReport(credcoRequest: CredcoRequestDto): Promise<any> {
    try {
      const xmlPayload = create({
        ns0: {
          MESSAGE: {
            // Construct your XML payload for credit report using values from configuration and credcoRequest
            // Refer to the YAML configuration for the correct structure
          }
        }
      }).end({ prettyPrint: true });

      this.logger.debug('Constructed XML payload for Credco API:', xmlPayload);

      const credcoApiEndpoint = 'https://credco-api-endpoint.com'; // Replace with actual endpoint
      const credcoResponse = await this.httpService
        .post(credcoApiEndpoint, xmlPayload, {
          headers: { 'Content-Type': 'application/xml' },
        })
        .toPromise();

      this.logger.debug('Credco API response:', credcoResponse.data);

      // Process the Credco API response as needed
      // ...

      return credcoResponse.data;
    } catch (error) {
      this.logger.error('Error processing data:', error.message);
      throw new Error('Error processing data');
    }
  }
}
