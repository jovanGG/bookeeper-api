import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { Genre } from './entities/genre.entity';
import { BooksService } from './books.service';
import { Event } from '../events/entities/event.entity';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Event])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
