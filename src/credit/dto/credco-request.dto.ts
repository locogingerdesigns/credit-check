import { IsString, IsDateString, IsBoolean, ValidateNested } from 'class-validator';

class PartyDto {

  @IsString()
  borrowerFirstName: string;

  @IsString()
  borrowerMiddleName: string;

  @IsString()
  borrowerLastName: string;

  @IsString()
  borrowerNameSuffix: string;

  @IsString()
  borrowerSSN: string;

  @IsString()
  borrowerDOB: string;

  // @ValidateNested()
  // borrowerAddress: BorrowerAddressDto;

}

class BorrowerAddressDto {

  @IsString()
  streetPrimaryNumberText: string;

  @IsString()
  streetName: string;

  @IsString()
  streetSuffixText: string;

  @IsString()
  streetCity: string;

  @IsString()
  streetStateCode: string;

  @IsString()
  streetPostalCode: string;

  @IsString()
  countryCode: string;

}

class CreditReportsDto {

  @IsBoolean()
  includeEquifax: boolean;
  
  @IsBoolean()
  includeExperian: boolean;

  @IsBoolean()
  includeTransUnion: boolean;

}

export class CredcoRequestDto {

  @IsString()
  loanIdentifier: string;

  @IsString() 
  loanIdentifierType: string;

  @IsString()
  loanOriginationSystemName: string;

  @IsString()
  partyRoleType: string;

  @IsString()
  creditReportRequestActionType: string;

  @IsString()
  creditReportType: string;

  @IsString()
  reportingInformationIdentifier: string;

  @IsString()
  reportingInformationName: string;

  @IsString()
  legalEntityName: string;

  @IsString()
  requestingPartyRoleType: string;
   
  @IsString()
  loginAccountIdentifier: string;

  @IsString()
  loginAccountPassword: string;

  // Add borrower details
  @IsString()
  borrowerFirstName: string;

  @IsString()
  borrowerLastName: string;

  @IsString()
  borrowerMiddleName: string;

  @IsDateString()
  borrowerBirthDate: string;

  // Add address fields
  @IsString()
  streetName: string;

  @IsString()
  streetNumber: string;

  @IsString()
  streetCity: string;

  @IsString()
  streetStateCode: string;

  @IsString()
  streetPostalCode: string;

}

