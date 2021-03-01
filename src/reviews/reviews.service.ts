import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alcohol } from 'src/alcohols/entities/alcohol.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Alcohol) private alcoholRepository: Repository<Alcohol>,
  ) {}
  async create(createReviewDto: CreateReviewDto, userId) {
    const { alcoholId, desc } = createReviewDto;
    const newReview = new Review();
    const user = await this.userRepository.findOne(userId, {
      relations: ['reviews'],
    });
    const alcohol = await this.alcoholRepository.findOne(alcoholId, {
      relations: ['reviews'],
    });
    newReview.desc = desc;
    newReview.alcohol = alcohol;
    newReview.user = user;
    const returnedReview = await this.reviewRepository.save(newReview);
    user.reviews = [...user.reviews, returnedReview];
    alcohol.reviews = [...alcohol.reviews, returnedReview];
    await this.userRepository.save(user);
    await this.alcoholRepository.save(alcohol);
    return true;
  }

  async getByUserId(id: string) {
    return await this.reviewRepository.find({ where: { userId: id } });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    await this.reviewRepository.update(id, updateReviewDto);
    return true;
  }

  async remove(id: string) {
    await this.reviewRepository.delete(id);
    return true;
  }
}
