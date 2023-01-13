import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Genre, (genre) => genre.books, {
    cascade: true,
  })
  genres: Genre[];

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
