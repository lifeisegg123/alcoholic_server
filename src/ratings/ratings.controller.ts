import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(req.user.userId, createRatingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Request() req, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(req.user.userId, updateRatingDto);
  }
}
