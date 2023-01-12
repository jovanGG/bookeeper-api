import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Version,
} from '@nestjs/common';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateBookDto, UpdateBookDto } from './dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Version('1')
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.booksService.findAll(paginationQuery);
  }

  @Get(':id')
  @Version('1')
  async findOne(@Param('id') id: string) {
    return await this.booksService.findOne(id);
  }

  @Post()
  @Version('1')
  async create(@Body() createBookDto: CreateBookDto, @Request() req) {
    const { sub } = req;
    return await this.booksService.create(createBookDto, sub);
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
