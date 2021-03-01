import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { User } from 'src/users/entities/user.entity';
import { Alcohol } from 'src/alcohols/entities/alcohol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, User, Alcohol])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
