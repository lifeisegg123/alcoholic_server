import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alcohol } from 'src/alcohols/entities/alcohol.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Alcohol) private alcoholRepository: Repository<Alcohol>,
  ) {}
  async create(userId: string, createRatingDto: CreateRatingDto) {
    const { alcoholId, rating } = createRatingDto;
    const isExist = await this.ratingRepository.findOne({
      where: { alcohol: alcoholId, user: userId },
    });
    if (isExist) {
      return false;
    }

    const newRating = new Rating();
    const user = await this.userRepository.findOne(userId, {
      relations: ['ratings'],
    });
    const alcohol = await this.alcoholRepository.findOne(alcoholId, {
      relations: ['ratings'],
    });

    newRating.rating = rating;
    newRating.alcohol = alcohol;
    newRating.user = user;

    const returnedRating = await this.ratingRepository.save(newRating);
    user.ratings = [...user.ratings, returnedRating];
    alcohol.ratings = [...alcohol.ratings, returnedRating];
    alcohol.rating =
      (alcohol.rating * alcohol.ratingCount + rating) /
      (alcohol.ratingCount + 1);
    alcohol.ratingCount += 1;
    await this.userRepository.save(user);
    await this.alcoholRepository.save(alcohol);
    return true;
  }

  async update(userId: string, updateRatingDto: UpdateRatingDto) {
    const { alcoholId, rating } = updateRatingDto;
    const target = await this.ratingRepository.findOne({
      where: { user: userId, alcohol: alcoholId },
    });
    const alcoholItem = await this.alcoholRepository.findOne(alcoholId);
    alcoholItem.rating =
      (alcoholItem.rating * alcoholItem.ratingCount + rating - target.rating) /
      alcoholItem.ratingCount;

    target.rating = rating;
    await this.ratingRepository.save(target);
    await this.alcoholRepository.save(alcoholItem);

    return true;
  }
}
