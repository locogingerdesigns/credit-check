// import { Controller, Get, Param, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
// import { CreditReportService } from './credit-report.service';
// import { ParseSSNPipe } from '../common/pipes/parse-ssn.pipe';
// import { RequestItemDto } from './dto/request-item.dto';

// @Controller('credit-report')
// export class CreditReportController {

//   constructor(private creditReportService: CreditReportService) {}

//   @Get(':ssn')
//   async getReport(@Param('ssn', ParseSSNPipe) ssn: string) {
    
//     try {
//       const report = await this.creditReportService.getReport(ssn);

//       return {
//         statusCode: HttpStatus.OK,
//         report: report  
//       };

//     } catch (error) {
//       throw new HttpException('Error getting credit report', HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//   }

//   @Post()
//   async getReport(@Body() body: RequestItemDto) {

//     try {
//       const report = await this.creditReportService.getReport(body); 

//       return {
//         statusCode: HttpStatus.OK,
//         report: report
//       };

//     } catch (error) {
//       throw new HttpException('Error getting credit report', HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//   }

// }
