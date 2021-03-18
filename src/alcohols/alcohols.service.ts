import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { getCategoryOp } from 'src/utils/getCategoryOp';
import { Like, Repository } from 'typeorm';
import { CreateAlcoholDto } from './dto/create-alcohol.dto';
import { UpdateAlcoholDto } from './dto/update-alcohol.dto';
import { Alcohol } from './entities/alcohol.entity';

@Injectable()
export class AlcoholsService {
  constructor(
    @InjectRepository(Alcohol) private alcoholRepository: Repository<Alcohol>,
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async create(createAlcoholDto: CreateAlcoholDto, file: Express.Multer.File) {
    await this.alcoholRepository.save({
      ...createAlcoholDto,
      thumbnail: file.path,
    });
    return true;
  }

  async findByCategory({ category, limit, offset, sortBy, searchKey }) {
    const where: any = { isConfirmed: true };
    const order: any = {};

    if (!isNaN(category) && category !== 0) {
      where['category'] = getCategoryOp(category);
    }
    if (sortBy) {
      const [key, value] = sortBy.split(',');
      order[key] = value;
    }
    if (searchKey) {
      where['name'] = Like(searchKey);
    }

    const [data, count] = await this.alcoholRepository.findAndCount({
      where,
      order,
      skip: offset,
      take: limit,
    });
    return {
      count,
      data,
      nextPage: data.length === limit ? limit + offset : null,
    };
  }

  async getRandomOne() {
    const res = await this.alcoholRepository
      .createQueryBuilder('alcohol')
      .where('alcohol.isConfirmed = true')
      .orderBy('Rand()')
      .leftJoinAndSelect('alcohol.reviews', 'reviews')
      .leftJoin('reviews.user', 'reviwer')
      .addSelect('reviwer.id')
      .addSelect('reviwer.nickname')
      .leftJoinAndSelect('alcohol.ratings', 'ratings')
      .leftJoin('ratings.user', 'ratinguser')
      .addSelect('ratinguser.id')
      .getOne();
    console.log(res);
    return res;
  }

  async getNotConfirmed() {
    return await this.alcoholRepository.find({ where: { isConfirmed: false } });
  }

  async findOne(id: string) {
    /* const res = await this.alcoholRepository.findOne(id, {
      relations: ['reviews', 'reviews.user', 'ratings', 'ratings.user'],
    }); */
    const res = await this.alcoholRepository
      .createQueryBuilder('alcohol')
      .where('alcohol.id = :id', { id })
      .leftJoinAndSelect('alcohol.reviews', 'reviews')
      .leftJoin('reviews.user', 'reviwer')
      .addSelect('reviwer.id')
      .addSelect('reviwer.nickname')
      .leftJoinAndSelect('alcohol.ratings', 'ratings')
      .leftJoin('ratings.user', 'ratinguser')
      .addSelect('ratinguser.id')
      .getOne();
    return res;
  }

  async update(
    id: string,
    updateAlcoholDto: UpdateAlcoholDto,
    file: Express.Multer.File,
  ) {
    const updateData = { ...updateAlcoholDto, isConfirmed: true };
    if (file) {
      updateData['thumbnail'] = file.path;
    }
    await this.alcoholRepository.update(id, updateData);
    return true;
  }

  async remove(id: string) {
    console.log(id);
    await this.ratingRepository
      .createQueryBuilder('rating')
      .delete()
      .where('rating.alcoholId = :id', { id })
      .execute();
    await this.reviewRepository
      .createQueryBuilder('review')
      .delete()
      .where('review.alcoholId = :id', { id })
      .execute();
    await this.alcoholRepository
      .createQueryBuilder('alcohol')
      .delete()
      .where('alcohol.id = :id', { id })
      .execute();
    return true;
  }
}
