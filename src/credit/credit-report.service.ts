import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as xml2js from 'xml2js';
import * as pdfjs from 'pdfjs-dist/es5/build/pdf'; 
import { CredcoRequestDto } from './dto/credco.dto';

@Injectable()
export class CreditReportService {

  constructor(private httpService: HttpService) {}

  async getOAuthToken() {

    try {
  
      const tokenResponse = await this.httpService.post('/oauth/token', {
        grant_type: 'client_credentials'
      }).toPromise();
  
      return tokenResponse.data.access_token;
  
    } catch (error) {
      throw new HttpException('Error getting OAuth token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  }

  async getReport(requestData: CredcoRequestDto) {
    // Get OAuth token
    const token = await this.getOAuthToken();

    // Set Authorization header with bearer token
    const headers = {
      Authorization: `Bearer ${token}` 
    };

    const body = this.buildRequestBody(requestData);
    
    try {
      // Make API request
      const response = await this.httpService.post('https://limaone-elphi-credco-proxy-api.us-e1.cloudhub.io/api/credit/v1/report', body).toPromise();
    
      // Parse XML response
      const parsedResponse = this.parseXmlResponse(response.data);

      // Transform to CreditReport model
      const report = this.transformReport(parsedResponse);

      return report;

    } catch (error) {
      throw new HttpException('Error getting credit report', HttpStatus.INTERNAL_SERVER_ERROR); 
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
                        <ns0:LoanIdentifier>${requestData.loanId}</ns0:LoanIdentifier>
                        <ns0:LoanIdentifierType>${requestData.loanType}</ns0:LoanIdentifierType>
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
                        <ns0:FirstName>${requestData.firstName}</ns0:FirstName>
                        <ns0:LastName>${requestData.lastName}</ns0:LastName>
                        <ns0:MiddleName>${requestData.middleName}</ns0:MiddleName>
                      </ns0:NAME>
                    </ns0:INDIVIDUAL>
                
                    <ns0:ROLES>
                      <ns0:ROLE ns1:label="Borrower01">

                        <ns0:BORROWER>
                          <ns0:BORROWER_DETAIL>
                            <ns0:BorrowerBirthDate>${requestData.birthDate}</ns0:BorrowerBirthDate> 
                            <ns0:BorrowerClassificationType>Primary</ns0:BorrowerClassificationType>
                          </ns0:BORROWER_DETAIL>
                          <ns0:RESIDENCES>
                            <ns0:RESIDENCE SequenceNumber="1">
                            <ns0:ADDRESS>
                              <ns0:AddressFormatType>Individual</ns0:AddressFormatType>
                              <ns0:AddressType>Current</ns0:AddressType>
                              <ns0:CityName>${requestData.city}</ns0:CityName>
                              <ns0:CountryCode>${requestData.countryCode}</ns0:CountryCode>
                              <ns0:PostalCode>${requestData.postalCode}</ns0:PostalCode>
                              <ns0:StateCode>${requestData.stateCode}</ns0:StateCode>
                              <ns0:StreetName>${requestData.streetName}</ns0:StreetName>
                              <ns0:StreetPrimaryNumberText>${requestData.streetNumber}</ns0:StreetPrimaryNumberText>
                              <ns0:StreetSuffixText>${requestData.streetSuffix}</ns0:StreetSuffixText>
                            </ns0:ADDRESS>
                            <ns0:RESIDENCE_DETAIL>
                              <ns0:BorrowerResidencyType>Current</ns0:BorrowerResidencyType> 
                            </ns0:RESIDENCE_DETAIL>
                            </ns0:RESIDENCE>
                          </ns0:RESIDENCES>
                        </ns0:BORROWER>

                      <ns0:ROLE_DETAIL>
                        <ns0:PartyRoleType>Borrower</ns0:PartyRoleType> 
                      </ns0:ROLE_DETAIL>  

                      </ns0:ROLE>
                    </ns0:ROLES>

                    <ns0:TAXPAYER_IDENTIFIERS>
                      <ns0:TAXPAYER_IDENTIFIER>
                        <ns0:TaxpayerIdentifierType>SocialSecurityNumber</ns0:TaxpayerIdentifierType>
                        <ns0:TaxpayerIdentifierValue>
                          ${requestData.ssn} 
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
                              <ns0:CreditRepositoryIncludedEquifaxIndicator>true</ns0:CreditRepositoryIncludedEquifaxIndicator>
                              <ns0:CreditRepositoryIncludedExperianIndicator>true</ns0:CreditRepositoryIncludedExperianIndicator>
                              <ns0:CreditRepositoryIncludedTransUnionIndicator>true</ns0:CreditRepositoryIncludedTransUnionIndicator>
                            </ns0:CREDIT_REPOSITORY_INCLUDED>

                            <ns0:CREDIT_REQUEST_DATA_DETAIL>
                              <ns0:CreditReportRequestActionType>Submit</ns0:CreditReportRequestActionType>
                              <ns0:CreditReportType>Merge</ns0:CreditReportType>
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
                              <ns0:PreferredResponseFormatType>PDF</ns0:PreferredResponseFormatType>
                            </ns0:PREFERRED_RESPONSE>
                          </ns0:PREFERRED_RESPONSES>
                        </ns0:RETURN_TO>
                        <ns0:ROLE_DETAIL>
                          <ns0:PartyRoleType>RequestingParty</ns0:PartyRoleType>
                        </ns0:ROLE_DETAIL>
                      </ns0:ROLE>

                      <ns0:ROLE SequenceNumber="2" ns1:label="RequestingParty002">
                        <ns0:REQUESTING_PARTY>
                          <ns0:RequestedByName>${requestData.requestedByName}</ns0:RequestedByName>
                          
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
                          <ns0:PartyRoleType>SubmittingParty</ns0:PartyRoleType>
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

  parseXmlResponse(xml: string) {

    // Parse XML string into JS object
    const parsed = xml2js.parseString(xml, { mergeAttrs: true });
  
    // Get credit report
    const creditReport = parsed.CreditReportResponse.CreditReport;
  
    // Return parsed credit report
    return creditReport;
  
  }
  

  transformReport(pdfBuffer: Buffer): CreditReport {

    // Parse PDF buffer to text
    const pdfText = pdfjs.getDocument(pdfBuffer).then(pdf => {
      return pdf.getTextContent(); 
    });
  
    // Extract relevant data from PDF text
    // This would depend on the PDF structure
    const tradeLines = extractTradelines(pdfText); 
    const score = extractScore(pdfText);
  
    // Build CreditReport model
    const report = new CreditReport();
    report.score = score;
    report.tradeLines = tradeLines;
  
    return report;
  
  }
  

}

// Credit score model
export class CreditReport {
  value: number;
}
