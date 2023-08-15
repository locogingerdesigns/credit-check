import { Controller, Post, Body, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CredcoRequestDto } from './dto/credco.dto';
import { plainToClass } from 'class-transformer';

@Controller('credit')
export class CreditController {
  private readonly logger = new Logger(CreditController.name);

  constructor(private creditScoreService: CreditService) {}

  @Post()
  async getCredit(@Body() body: any) {
    try {
      // Map incoming JSON data to CredcoRequestDto instance
      const credcoRequest: CredcoRequestDto = plainToClass(CredcoRequestDto, body);

      const scoreXml = await this.creditScoreService.getScore(credcoRequest);

      // Return the XML response
      return scoreXml;
    } catch (error) {
      this.logger.error(`Error retrieving credit score: ${error.message}`, error.stack);
      throw new HttpException('Error retrieving credit score', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
