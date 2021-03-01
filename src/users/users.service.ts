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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
