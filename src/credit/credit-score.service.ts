import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as xml2js from 'xml2js';
import { CredcoRequestDto } from './dto/credco.dto';

@Injectable()
export class CreditScoreService {

  private readonly logger = new Logger(CreditScoreService.name);

  constructor(private httpService: HttpService) {}

  async getScore(requestData: CredcoRequestDto) {
    try {

      // Get OAuth token
      const token = await this.getOAuthToken();

      // Set Authorization header with bearer token
      const headers = {
      Authorization: `Bearer ${token}`
      };

      const body = this.buildRequestBody(requestData);

      // Make API request to correct endpoint 
      const response = await this.httpService.post(
        'https://limaone-elphi-credco-proxy-api.us-e1.cloudhub.io/api/credit',
        body,
        {
          headers: {
            // 'Content-Type': 'text/plain',
            'Content-Type': 'application/json',
            'User-Agent': 'PostmanRuntime/7.32.3',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'client_id': 'eb5ef25afc704758b65db4e644842520',
            'client_secret': 'Bc9D0f5Ce0344130bc0552D53093c0de',
          },
        }
      ).toPromise();

      // Log the JSON response for debugging
      this.logger.log('Corelogic API Response:', response.data);

      // Format JSON response to XML
      const xml = this.jsonToXml(response.data);

      // Send formatted XML to Credco API and handle the response
      const credcoResponse = await this.sendXmlToCredco(xml);

      // Log the Credco API response
      this.logger.log('Unparsed Credco API Response:', credcoResponse, 'xml');

      return credcoResponse;

    } catch (error) {
      throw new HttpException('Error getting credit score', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  private async getOAuthToken(): Promise<string> {
    const oauthUrl = 'https://' + process.env.CRED_CO_TOKEN_HOST + process.env.CRED_CO_TOKEN_URL;
    const authorizationHeader = 'Basic ' + process.env.CRED_CO_AUTHORIZATION;

    try {
      const response = await this.httpService.post(
        oauthUrl,
        null,
        {
          headers: {
            Authorization: authorizationHeader,
          },
        }
      ).toPromise();

      return response.data.access_token;
    } catch (error) {
      throw new HttpException('Error getting OAuth token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  buildRequestBody(requestData: CredcoRequestDto) {

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
                        <ns0:LoanIdentifier>${requestData.loanIdentifier}</ns0:LoanIdentifier>
                        <ns0:LoanIdentifierType>${requestData.loanIdentifierType}</ns0:LoanIdentifierType>
                      </ns0:LOAN_IDENTIFIER>
                    </ns0:LOAN_IDENTIFIERS>
  
                    <ns0:ORIGINATION_SYSTEMS>
                      <ns0:ORIGINATION_SYSTEM>
                        <ns0:LoanOriginationSystemName>${requestData.loanOriginationSystemName}</ns0:LoanOriginationSystemName>
                      </ns0:ORIGINATION_SYSTEM>
                    </ns0:ORIGINATION_SYSTEMS>
  
                  </ns0:LOAN>
                </ns0:LOANS>
  
                <ns0:PARTIES>
                  <ns0:PARTY SequenceNumber="1">

                    <ns0:INDIVIDUAL>
                      <ns0:NAME>
                        <ns0:FirstName>${requestData.party.borrowerFirstName}</ns0:FirstName>
                        <ns0:LastName>${requestData.party.borrowerLastName}</ns0:LastName>
                        <ns0:MiddleName>${requestData.party.borrowerMiddleName}</ns0:MiddleName>
                      </ns0:NAME>
                    </ns0:INDIVIDUAL>
                
                    <ns0:ROLES>
                      <ns0:ROLE ns1:label="Borrower01">

                        <ns0:BORROWER>
                          <ns0:BORROWER_DETAIL>
                            <ns0:BorrowerBirthDate>${requestData.party.borrowerDOB}</ns0:BorrowerBirthDate> 
                            <ns0:BorrowerClassificationType>Primary</ns0:BorrowerClassificationType>
                          </ns0:BORROWER_DETAIL>
                          <ns0:RESIDENCES>
                            <ns0:RESIDENCE SequenceNumber="1">
                            <ns0:ADDRESS>
                              <ns0:AddressFormatType>Individual</ns0:AddressFormatType>
                              <ns0:AddressType>Current</ns0:AddressType>
                              <ns0:CityName>${requestData.party.borrowerAddress.streetCity}</ns0:CityName>
                              <ns0:CountryCode>${requestData.party.borrowerAddress.countryCode}</ns0:CountryCode>
                              <ns0:PostalCode>${requestData.party.borrowerAddress.streetPostalCode}</ns0:PostalCode>
                              <ns0:StateCode>${requestData.party.borrowerAddress.streetStateCode}</ns0:StateCode>
                              <ns0:StreetName>${requestData.party.borrowerAddress.streetName}</ns0:StreetName>
                              <ns0:StreetPrimaryNumberText>${requestData.party.borrowerAddress.streetPrimaryNumberText}</ns0:StreetPrimaryNumberText>
                              <ns0:StreetSuffixText>${requestData.party.borrowerAddress.streetSuffixText}</ns0:StreetSuffixText>
                            </ns0:ADDRESS>
                            <ns0:RESIDENCE_DETAIL>
                              <ns0:BorrowerResidencyType>Current</ns0:BorrowerResidencyType> 
                            </ns0:RESIDENCE_DETAIL>
                            </ns0:RESIDENCE>
                          </ns0:RESIDENCES>
                        </ns0:BORROWER>

                      <ns0:ROLE_DETAIL>
                        <ns0:PartyRoleType>${requestData.partyRoleType}</ns0:PartyRoleType> 
                      </ns0:ROLE_DETAIL>  

                      </ns0:ROLE>
                    </ns0:ROLES>

                    <ns0:TAXPAYER_IDENTIFIERS>
                      <ns0:TAXPAYER_IDENTIFIER>
                        <ns0:TaxpayerIdentifierType>SocialSecurityNumber</ns0:TaxpayerIdentifierType>
                        <ns0:TaxpayerIdentifierValue>
                          ${requestData.party.borrowerSSN} 
                        </ns0:TaxpayerIdentifierValue>
                      </ns0:TAXPAYER_IDENTIFIER>
                    </ns0:TAXPAYER_IDENTIFIERS>

                  </ns0:PARTY>
                </ns0:PARTIES>

                <ns0:SERVICES>
                  <ns0:SERVICE>

                    <ns0:CREDIT>
                      <ns0:CREDIT_REQUEST>
                        <ns0:CREDIT_REQUEST_DATAS>
                        
                          <ns0:CREDIT_REQUEST_DATA ns1:label="CreditRequest001">

                            <ns0:CREDIT_REPOSITORY_INCLUDED>
                              <ns0:CreditRepositoryIncludedEquifaxIndicator>${requestData.CreditReports.includeEquifax}</ns0:CreditRepositoryIncludedEquifaxIndicator>
                              <ns0:CreditRepositoryIncludedExperianIndicator>${requestData.CreditReports.includeExperian}</ns0:CreditRepositoryIncludedExperianIndicator>
                              <ns0:CreditRepositoryIncludedTransUnionIndicator>${requestData.CreditReports.includeTransUnion}</ns0:CreditRepositoryIncludedTransUnionIndicator>
                            </ns0:CREDIT_REPOSITORY_INCLUDED>

                            <ns0:CREDIT_REQUEST_DATA_DETAIL>
                              <ns0:CreditReportRequestActionType>${requestData.creditReportRequestActionType}</ns0:CreditReportRequestActionType>
                              <ns0:CreditReportType>${requestData.creditReportType}</ns0:CreditReportType>
                              <ns0:CreditRequestType>Individual</ns0:CreditRequestType>
                            </ns0:CREDIT_REQUEST_DATA_DETAIL>

                          </ns0:CREDIT_REQUEST_DATA>
                        </ns0:CREDIT_REQUEST_DATAS>
                      </ns0:CREDIT_REQUEST>
                    </ns0:CREDIT>
                  </ns0:SERVICE>
                </ns0:SERVICES>

                <ns0:PARTIES>

                  <ns0:PARTY SequenceNumber="1">

                    <ns0:LEGAL_ENTITY>
                      <ns0:LEGAL_ENTITY_DETAIL>
                        <ns0:FullName>${requestData.legalEntityName}</ns0:FullName>
                      </ns0:LEGAL_ENTITY_DETAIL>
                    </ns0:LEGAL_ENTITY>

                    <ns0:ROLES>

                      <ns0:ROLE ns1:label="RequestingParty001">
                        <ns0:RETURN_TO>
                          <ns0:PREFERRED_RESPONSES>
                            <ns0:PREFERRED_RESPONSE>
                              <ns0:PreferredResponseFormatType>XML</ns0:PreferredResponseFormatType>
                            </ns0:PREFERRED_RESPONSE>
                          </ns0:PREFERRED_RESPONSES>
                        </ns0:RETURN_TO>
                        <ns0:ROLE_DETAIL>
                          <ns0:PartyRoleType>${requestData.partyRoleType}</ns0:PartyRoleType>
                        </ns0:ROLE_DETAIL>
                      </ns0:ROLE>

                      <ns0:ROLE SequenceNumber="2" ns1:label="RequestingParty002">
                        <ns0:REQUESTING_PARTY>
                          <ns0:RequestedByName>Lima One Capital</ns0:RequestedByName>
                          
                          <ns0:EXTENSION>
                            <ns0:OTHER>
                              <cl:REQUESTING_PARTY>
                                <cl:LoginAccountIdentifier>${requestData.loginAccountIdentifier}</cl:LoginAccountIdentifier>
                                <cl:LoginAccountPassword>${requestData.loginAccountPassword}</cl:LoginAccountPassword>
                              </cl:REQUESTING_PARTY>
                            </ns0:OTHER>
                          </ns0:EXTENSION>

                        </ns0:REQUESTING_PARTY>
                      </ns0:ROLE>

                    </ns0:ROLES>

                  </ns0:PARTY>

                  <ns0:PARTY>

                    <ns0:LEGAL_ENTITY>
                      <ns0:LEGAL_ENTITY_DETAIL>
                        <ns0:FullName>${requestData.legalEntityName}</ns0:FullName> 
                      </ns0:LEGAL_ENTITY_DETAIL>
                    </ns0:LEGAL_ENTITY>

                    <ns0:ROLES>
                      <ns0:ROLE ns1:label="SubmittingParty001">
                        <ns0:ROLE_DETAIL>
                          <ns0:PartyRoleType>${requestData.partyRoleType}</ns0:PartyRoleType>
                        </ns0:ROLE_DETAIL>
                      </ns0:ROLE>
                    </ns0:ROLES>

                  </ns0:PARTY>

                </ns0:PARTIES>

  
              </ns0:DEAL>
            </ns0:DEALS>
  
          </ns0:DEAL_SET>
        </ns0:DEAL_SETS>
  
      </ns0:MESSAGE>
    `;
  
    return xml;
  
  }

  private jsonToXml(jsonData: any): string {
    const builder = new xml2js.Builder({ rootName: 'root' });
    const xmlData = builder.buildObject(jsonData);
    return xmlData;
  }

  async sendXmlToCredco(xmlData: string): Promise<string> {
    // Replace this with your actual Credco API endpoint
    const credcoApiUrl = 'https://your-credco-api-url';

    try {
      const response = await this.httpService.post(credcoApiUrl, xmlData, {
        headers: {
          'Content-Type': 'application/xml',
        },
        responseType: 'text', 
      }).toPromise();

      const responseData = response.data;

      // Log the unparsed XML response from Credco to the terminal
      this.logger.log('Credco Unparsed XML Response:', responseData);

      return responseData;
    } catch (error) {
      throw new HttpException('Error sending XML to Credco API', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
