import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Book } from './entities/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({ where: { id: +id } });

    if (!book) {
      throw new NotFoundException(`Book #${id} doesn't seem to exist.`);
    }

    return book;
  }

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);

    return this.bookRepository.save(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id: +id,
      ...updateBookDto,
    });

    if (!book) {
      throw new NotFoundException(`Book #${id} doesn't seem to exist.`);
    }

    return this.bookRepository.save(book);
  }

  async remove(id: string) {
    const book = await this.findOne(id);

    return this.bookRepository.remove(book);
  }
}
