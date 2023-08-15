import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule from @nestjs/axios
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';

@Module({
  imports: [HttpModule], // Use HttpModule from @nestjs/axios
  providers: [CreditService],
  controllers: [CreditController],
})
export class CreditModule {}
