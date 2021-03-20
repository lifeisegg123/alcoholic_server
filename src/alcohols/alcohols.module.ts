import { Module } from '@nestjs/common';
import { AlcoholsService } from './alcohols.service';
import { AlcoholsController } from './alcohols.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alcohol } from './entities/alcohol.entity';
import { MulterModule } from '@nestjs/platform-express';
import MulterGoogleCloudStorage from 'multer-google-storage';
import { join } from 'path';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alcohol, Rating, Review]),
    MulterModule.register({
      storage: new MulterGoogleCloudStorage({
        keyFilename: join(__dirname + '../../../gcp.json'),
        bucket: 'alcoholic',
        projectId: process.env.GCP_PROJECT_ID,
      }),
      dest: './images',
    }),
  ],
  controllers: [AlcoholsController],
  providers: [AlcoholsService],
})
export class AlcoholsModule {}
