import { Alcohol } from 'src/alcohols/entities/alcohol.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  desc: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Alcohol, (alcohol) => alcohol.reviews)
  alcohol: Alcohol;
}
