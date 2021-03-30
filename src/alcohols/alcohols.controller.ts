import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlcoholsService } from './alcohols.service';
import { CreateAlcoholDto } from './dto/create-alcohol.dto';
import { UpdateAlcoholDto } from './dto/update-alcohol.dto';

@Controller('alcohols')
export class AlcoholsController {
  constructor(private readonly alcoholsService: AlcoholsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAlcoholDto: CreateAlcoholDto,
  ) {
    return this.alcoholsService.create(createAlcoholDto, file);
  }

  @Get()
  getByCategory(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('category') category?: number,
    @Query('sortBy') sortBy?: string,
    @Query('searchKey') searchKey?: string,
  ) {
    return this.alcoholsService.findByCategory({
      category,
      limit,
      offset,
      sortBy,
      searchKey,
    });
  }

  @Get('all')
  getAll() {
    return this.alcoholsService.getAll();
  }

  @Get('random')
  getRandomOne() {
    return this.alcoholsService.getRandomOne();
  }

  @Get('random-list')
  getRandomList() {
    return this.alcoholsService.getRandomList();
  }

  @Get('admin')
  findNotConfirmed() {
    return this.alcoholsService.getNotConfirmed();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.alcoholsService.findOne(name);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateAlcoholDto: UpdateAlcoholDto,
  ) {
    return this.alcoholsService.update(id, updateAlcoholDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alcoholsService.remove(id);
  }
}
