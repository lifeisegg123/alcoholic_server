import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateAlcoholDto } from './create-alcohol.dto';

export class UpdateAlcoholDto extends PartialType(CreateAlcoholDto) {
  @IsString()
  adminComment?: string;
}
