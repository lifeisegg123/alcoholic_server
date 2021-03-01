import { IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  alcoholId: string;

  @IsNumber()
  rating: number;
}
