import { IsDefined, IsString } from 'class-validator';

export class CreateAlcoholDto {
  @IsString()
  name: string;

  @IsDefined()
  category: number;

  @IsDefined()
  price: number;

  @IsString()
  desc: string;

  @IsDefined()
  alcoholPercentage: number;

  @IsString()
  sellingAt: string;

  @IsString()
  recommandedFood: string;

  @IsString()
  ingredient: string;
}
