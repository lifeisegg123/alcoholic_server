import { Module } from '@nestjs/common';
import { AlcoholsService } from './alcohols.service';
import { AlcoholsController } from './alcohols.controller';

@Module({
  controllers: [AlcoholsController],
  providers: [AlcoholsService]
})
export class AlcoholsModule {}
