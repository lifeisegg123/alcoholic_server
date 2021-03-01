import { Rating } from 'src/ratings/entities/rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  nickname: string;

  @Column('bool', { default: false })
  isAdmin: boolean;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
