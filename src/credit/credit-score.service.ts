import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CreditScoreService {

  constructor(private httpService: HttpService) {}

  async getOAuthToken() {
    // Call OAuth API endpoint
    // Return access token
  }

  buildRequestBody(request: CreditRequest) {

    // Build XML structure
    const xml = `
      <ns0:MESSAGE>
        <ns0:DEAL_SETS>
          <ns0:DEAL_SET>
            <ns0:DEALS>
              <ns0:DEAL>
                <ns0:LOANS>
                  <ns0:LOAN LoanRoleType="SubjectLoan">
                    <ns0:LOAN_IDENTIFIERS>
                      <ns0:LOAN_IDENTIFIER>
                        <ns0:LoanIdentifier>${request.loanId}</ns0:LoanIdentifier>
                        <ns0:LoanIdentifierType>${request.loanType}</ns0:LoanIdentifierType>
                      </ns0:LOAN_IDENTIFIER>
                    </ns0:LOAN_IDENTIFIERS>
                    <ns0:ORIGINATION_SYSTEMS>
                      <ns0:ORIGINATION_SYSTEM>
                        <ns0:LoanOriginationSystemName>${request.originationSystem}</ns0:LoanOriginationSystemName>
                      </ns0:ORIGINATION_SYSTEM>
                    </ns0:ORIGINATION_SYSTEMS>
                  </ns0:LOAN>
                </ns0:LOANS>
                // ...other nodes
              </ns0:DEAL>
            </ns0:DEALS>
          </ns0:DEAL_SET>
        </ns0:DEAL_SETS>
      </ns0:MESSAGE>
    `;

    return xml;

  }

  async getScore(ssn: string) {

    try {
      const response = await this.httpService.get('https://creditscoreapi.com/score', {
        params: { ssn }  
      }).toPromise();

      return this.transformScore(response.data.score);
      
    } catch (error) {
      throw new HttpException('Error getting credit score', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  transformScore(rawScore: number): CreditScore {

    // Map raw score to CreditScore model

    const score = new CreditScore();
    score.value = rawScore;

    return score;

  }

}

// Credit score model
export class CreditScore {
  value: number;
}
