import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { CreateBookDto, UpdateBookDto } from './dto';
import { User } from '../user/entities/user.entity';
import { Genre } from './entities/genre.entity';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  getAllBooks(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.bookRepository.find({
      relations: {
        genres: true,
        user: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async getBook(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id: +id },
      relations: {
        genres: true,
        user: true,
      },
    });

    if (!book) {
      throw new NotFoundException(`Book #${id} doesn't seem to exist.`);
    }

    return book;
  }

  async createBook(createBookDto: CreateBookDto, id: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: id },
    });

    const genres = await Promise.all(
      createBookDto.genres.map((name) => this.preloadGenreByName(name)),
    );

    const book = this.bookRepository.create({
      ...createBookDto,
      genres,
      user,
    });

    return this.bookRepository.save(book);
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto) {
    const genres =
      updateBookDto.genres &&
      (await Promise.all(
        updateBookDto.genres.map((name) => this.preloadGenreByName(name)),
      ));

    const book = await this.bookRepository.preload({
      id: +id,
      ...updateBookDto,
      genres,
    });

    if (!book) {
      throw new NotFoundException(`Book #${id} doesn't seem to exist.`);
    }

    return this.bookRepository.save(book);
  }

  async remove(id: string) {
    const book = await this.getBook(id);

    return this.bookRepository.remove(book);
  }

  async recommendBook(book: Book) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      book.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_book';
      recommendEvent.type = 'book';
      recommendEvent.payload = { bookId: book.id };

      await queryRunner.manager.save(book);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadGenreByName(name: string): Promise<Genre> {
    const exisitingGenre = await this.genreRepository.findOne({
      where: { name },
    });

    if (exisitingGenre) {
      return exisitingGenre;
    }

    return this.genreRepository.create({ name });
  }
}
