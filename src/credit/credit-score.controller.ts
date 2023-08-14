import { Controller, Post, Body, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { CreditScoreService } from './credit-score.service';
import { CredcoRequestDto } from './dto/credco.dto';
import { plainToClass } from 'class-transformer';

@Controller('credit-score')
export class CreditScoreController {
  private readonly logger = new Logger(CreditScoreController.name);

  constructor(private creditScoreService: CreditScoreService) {}

  @Post()
  async getCreditScore(@Body() body: any) {
    try {
      // Map incoming JSON data to CredcoRequestDto instance
      const credcoRequest: CredcoRequestDto = plainToClass(CredcoRequestDto, body);

      const scoreXml = await this.creditScoreService.getScore(credcoRequest);

      return {
        statusCode: HttpStatus.OK,
        xmlResponse: scoreXml,
      };
    } catch (error) {
      this.logger.error(`Error retrieving credit score: ${error.message}`, error.stack);
      throw new HttpException('Error retrieving credit score', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
