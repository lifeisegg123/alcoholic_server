import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  desc: string;

  @IsString()
  userId: string;

  @IsString()
  alcoholId: string;
}
