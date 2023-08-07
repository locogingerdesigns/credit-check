import { IsString, IsBoolean, ValidateNested, IsUUID } from 'class-validator';
import { PipeTransform, Injectable, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';

class CreditScoreDto {

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
    equifax: boolean;
  
    @IsBoolean()
    experian: boolean;
  
    @IsBoolean()
    transUnion: boolean;
  
}
  
export class CreditScoreRequestDto {

@IsString()
borrowerSSN: string;

@IsString()
borrowerDOB: string;

@ValidateNested()
borrowerAddress: BorrowerAddressDto;

@ValidateNested()
creditReports: CreditReportsDto;

@IsUUID('4')
@IsString()
loanIdentifier: string;

@IsString()
loanIdentifierType: string;

@IsString()
loanOriginationSystemName: string;

@IsString()
creditReportRequestActionType: string;

@IsString()
creditReportType: string;

@IsString() 
reportingInformationIdentifier: string;

@IsString()
reportingInformationName: string;

}

