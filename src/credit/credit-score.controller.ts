import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { CreditScoreService } from './credit-score.service';
import { CredcoRequestDto } from './dto/credco.dto';

@Controller('credit-score')
export class CreditScoreController {

  constructor(private creditScoreService: CreditScoreService) {}

  @Post()
  async getCreditScore(@Body() body: CredcoRequestDto) {
    try {
      const scoreXml = await this.creditScoreService.getScore(body);

      // You can parse the XML response and extract relevant data here
      // For example: const parsedScore = this.creditScoreService.parseXmlResponse(scoreXml);

      return {
        statusCode: HttpStatus.OK,
        // Include parsedScore or other relevant data if needed
        xmlResponse: scoreXml,
      };
    } catch (error) {
      // Handle errors gracefully and return appropriate error response
      throw new HttpException('Error retrieving credit score', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
