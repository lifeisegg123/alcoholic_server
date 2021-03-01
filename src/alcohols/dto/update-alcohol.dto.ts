import { PartialType } from '@nestjs/mapped-types';
import { CreateAlcoholDto } from './create-alcohol.dto';

export class UpdateAlcoholDto extends PartialType(CreateAlcoholDto) {}
