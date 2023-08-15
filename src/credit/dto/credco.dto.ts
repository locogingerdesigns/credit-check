import { IsUUID, IsString, IsDateString, IsBoolean, ValidateNested } from 'class-validator';
import { PipeTransform, Injectable, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { Type } from 'class-transformer';

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

export class CreditReportsDto {
  @IsBoolean()
  includeEquifax: boolean;

  @IsBoolean()
  includeExperian: boolean;

  @IsBoolean()
  includeTransUnion: boolean;
}

export class CredcoRequestDto {
  party: {
    borrowerFirstName: string;
    borrowerMiddleName: string;
    borrowerLastName: string;
    borrowerNameSuffix: string;
    borrowerSSN: string;
    borrowerDOB: string;
    borrowerAddress: {
      streetPrimaryNumberText: string;
      streetName: string;
      streetSuffixText: string;
      streetCity: string;
      streetStateCode: string;
      streetPostalCode: string;
      countryCode: string;
    };
  };
  CreditReports: {
    includeEquifax: boolean;
    includeExperian: boolean;
    includeTransUnion: boolean;
  };
  loanIdentifier: string;
  loanIdentifierType: string;
  loanOriginationSystemName: string;
  partyRoleType: string;
  creditReportRequestActionType: string;
  creditReportType: string;
  creditReportTypeOtherDescription: string;
  reportingInformationIdentifier: string;
  reportingInformationName: string;
  legalEntityName?: string;
  loginAccountIdentifier?: string;
  loginAccountPassword?: string;
}

