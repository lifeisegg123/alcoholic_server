import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alcohol } from 'src/alcohols/entities/alcohol.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Alcohol])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
