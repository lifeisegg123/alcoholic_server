import { PartialType } from '@nestjs/mapped-types';
import { IsString, ValidateIf } from 'class-validator';
import { CreateAlcoholDto } from './create-alcohol.dto';

export class UpdateAlcoholDto extends PartialType(CreateAlcoholDto) {
  @ValidateIf((obj) => obj.adminComment)
  @IsString()
  adminComment?: string;
}
