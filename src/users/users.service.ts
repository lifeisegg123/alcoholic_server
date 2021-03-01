import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      return false;
    }
    const password = await bcrypt.hash(createUserDto.password, 12);
    await this.userRepository.save({
      email: createUserDto.email,
      password,
      nickname: createUserDto.nickname,
    });
    return true;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne(id, {
      select: ['nickname', 'id'],
    });
    return user;
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id, {
      select: ['nickname', 'id'],
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const res = await this.userRepository.update(id, updateUserDto);
    if (res) {
      return true;
    }
    return false;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
