import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Event } from '../events/entities/event.entity';
import { BooksController } from './books.controller';
import { User } from '../user/entities/user.entity';
import { Genre } from './entities/genre.entity';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Event, User])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
