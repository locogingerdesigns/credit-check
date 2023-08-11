import { IsString, IsBoolean, IsDateString, ValidateNested, IsUUID } from 'class-validator';
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
  
export class CredcoRequestDto {

  @IsUUID()
  loanId: string;

  @IsString()
  loanType: string;

  @IsString()
  loanOriginationSystemName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString() 
  middleName: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  streetNumber: string;

  @IsString()
  streetName: string;

  @IsString()
  streetSuffix: string;

  @IsString()
  city: string;

  @IsString()
  stateCode: string;

  @IsString()
  postalCode: string;

  @IsString()
  countryCode: string;

  @IsString()
  ssn: string;

  @IsString()
  legalEntityName: string;

  @IsString()
  requestedByName: string;

  @IsString()
  loginAccountIdentifier: string;

  @IsString()
  loginAccountPassword: string;

}


