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
  @ValidateNested()
  @Type(() => BorrowerAddressDto)
  borrowerAddress: BorrowerAddressDto;

  @IsString()
  loanIdentifier: string;

  @IsString()
  loanIdentiferType: string;

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

  @ValidateNested()
  @Type(() => CreditReportsDto)
  CreditReports: CreditReportsDto;

  @IsString()
  borrowerFirstName: string;

  @IsString()
  borrowerMiddleName: string;

  @IsString()
  borrowerLastName: string;

  @IsString()
  borrowerNameSuffix: string;

  @IsString()
  borrowerDOB: string;
}
