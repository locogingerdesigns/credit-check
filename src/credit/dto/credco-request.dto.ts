import { IsString, IsBoolean, ValidateNested } from 'class-validator';

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

export class CreditRequestDto {

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

  @ValidateNested()
  borrowerAddress: BorrowerAddressDto;

  @ValidateNested()
  CreditReports: CreditReportsDto;

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
  creditReportTypeOtherDescription: string;

  @IsString()
  reportingInformationIdentifier: string;

  @IsString()
  reportingInformationName: string;

}
