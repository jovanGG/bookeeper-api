import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { BooksService } from './books.service';

import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Version('1')
  async findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return await this.booksService.findAll();
  }

  @Get(':id')
  @Version('1')
  async findOne(@Param('id') id: string) {
    return await this.booksService.findOne(id);
  }

  @Post()
  @Version('1')
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Patch(':id')
  @Version('1')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @Version('1')
  async delete(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}
