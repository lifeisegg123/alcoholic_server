import { Rating } from 'src/ratings/entities/rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alcohol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  thumbnail!: string;

  @Column('float', { default: 0 })
  rating: number;

  @Column('int', { default: 0 })
  ratingCount: number;

  @Column('int')
  price: number;

  @Column('text')
  desc: string;

  @Column('text', { nullable: true })
  adminComment: string;

  @Column('int')
  category: number;

  @Column('float')
  alcoholPercentage: number;

  @Column('text')
  sellingAt: string;

  @Column('text')
  recommandedFood: string;

  @Column('text')
  ingredient: string;

  @Column('bool', { default: false })
  isConfirmed: boolean;

  @OneToMany(() => Rating, (rating) => rating.alcohol)
  ratings: Rating[];

  @OneToMany(() => Review, (review) => review.alcohol)
  reviews: Review[];
}
