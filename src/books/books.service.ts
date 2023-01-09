import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Specification } from './entities/specification.entity';
import { Event } from 'src/events/entities/event.entity';
import { CreateBookDto, UpdateBookDto } from './dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Specification)
    private readonly specificationRepository: Repository<Specification>,

    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.bookRepository.find({
      relations: {
        specifications: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id: +id },
      relations: {
        specifications: true,
      },
    });

    if (!book) {
      throw new NotFoundException(`Book #${id} doesn't seem to exist.`);
    }

    return book;
  }

  async create(createBookDto: CreateBookDto) {
    const specifications = await Promise.all(
      createBookDto.specifications.map((name) =>
        this.preloadSpecificationByName(name),
      ),
    );

    const book = this.bookRepository.create({
      ...createBookDto,
      specifications,
    });

    return this.bookRepository.save(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const specifications =
      updateBookDto.specifications &&
      (await Promise.all(
        updateBookDto.specifications.map((name) =>
          this.preloadSpecificationByName(name),
        ),
      ));

    const book = await this.bookRepository.preload({
      id: +id,
      ...updateBookDto,
      specifications,
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

  private async preloadSpecificationByName(
    name: string,
  ): Promise<Specification> {
    const exisitingSpecification = await this.specificationRepository.findOne({
      where: { name },
    });

    if (exisitingSpecification) {
      return exisitingSpecification;
    }

    return this.specificationRepository.create({ name });
  }
}
