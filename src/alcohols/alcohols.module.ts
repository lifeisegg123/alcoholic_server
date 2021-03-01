import { Module } from '@nestjs/common';
import { AlcoholsService } from './alcohols.service';
import { AlcoholsController } from './alcohols.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alcohol } from './entities/alcohol.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alcohol]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AlcoholsController],
  providers: [AlcoholsService],
})
export class AlcoholsModule {}
