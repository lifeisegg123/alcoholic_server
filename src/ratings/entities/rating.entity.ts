import { Alcohol } from 'src/alcohols/entities/alcohol.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('float')
  rating: number;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Alcohol, (alcohol) => alcohol.ratings)
  alcohol: Alcohol;
}
