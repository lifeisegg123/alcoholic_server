import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getCategoryOp } from 'src/utils/getCategoryOp';
import { Like, Repository } from 'typeorm';
import { CreateAlcoholDto } from './dto/create-alcohol.dto';
import { UpdateAlcoholDto } from './dto/update-alcohol.dto';
import { Alcohol } from './entities/alcohol.entity';

@Injectable()
export class AlcoholsService {
  constructor(
    @InjectRepository(Alcohol) private alcoholRepository: Repository<Alcohol>,
  ) {}

  async create(createAlcoholDto: CreateAlcoholDto, file: Express.Multer.File) {
    await this.alcoholRepository.save({
      ...createAlcoholDto,
      thumbnail: file.filename,
    });
    return true;
  }

  async findByCategory({ category, limit, offset, sortBy, searchKey }) {
    const where: any = {};
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

  async getNotConfirmed() {
    return await this.alcoholRepository.find({ where: { isConfirmed: false } });
  }

  async findOne(id: string) {
    return await this.alcoholRepository.findOne(id, {
      relations: ['reviews', 'reviews.user', 'ratings'],
    });
  }

  async update(
    id: string,
    updateAlcoholDto: UpdateAlcoholDto,
    file: Express.Multer.File,
  ) {
    await this.alcoholRepository.update(id, {
      ...updateAlcoholDto,
      isConfirmed: true,
      thumbnail: file?.filename,
    });
    return true;
  }

  async remove(id: string) {
    await this.alcoholRepository.delete(id);
    return true;
  }
}
