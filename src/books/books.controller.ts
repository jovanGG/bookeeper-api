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

import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('books')
export class BooksController {
  @Get()
  @Version('1')
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return 'These are all of the books';
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return `This is the book ${id}`;
  }

  @Post()
  @Version('1')
  create(@Body() createBookDto: CreateBookDto) {
    return createBookDto;
  }

  @Patch(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return `This is the ${updateBookDto} for the Book #${id}`;
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return `Attempting to delete Book #${id}`;
  }
}
