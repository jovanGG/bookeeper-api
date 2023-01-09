import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Specification } from './entities/specification.entity';
import { Event } from 'src/events/entities/event.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Specification, Event])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
