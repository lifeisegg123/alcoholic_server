import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AlcoholsService } from './alcohols.service';
import { CreateAlcoholDto } from './dto/create-alcohol.dto';
import { UpdateAlcoholDto } from './dto/update-alcohol.dto';

@Controller('alcohols')
export class AlcoholsController {
  constructor(private readonly alcoholsService: AlcoholsService) {}

  @Post()
  create(@Body() createAlcoholDto: CreateAlcoholDto) {
    return this.alcoholsService.create(createAlcoholDto);
  }

  @Get()
  findAll() {
    return this.alcoholsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alcoholsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlcoholDto: UpdateAlcoholDto) {
    return this.alcoholsService.update(+id, updateAlcoholDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alcoholsService.remove(+id);
  }
}
