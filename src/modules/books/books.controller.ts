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
  UseGuards,
  Version,
} from '@nestjs/common';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/guards/roles.decorator';
import { CreateBookDto, UpdateBookDto } from './dto';
import { UserRoles } from '../user/utils/constants';
import { BooksService } from './books.service';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Version('1')
  async getAllBooks(@Query() paginationQuery: PaginationQueryDto) {
    return await this.booksService.getAllBooks(paginationQuery);
  }

  @Get(':id')
  @Version('1')
  async getBook(@Param('id') id: string) {
    return await this.booksService.getBook(id);
  }

  @Post()
  @Roles(UserRoles.MEMBER)
  @Version('1')
  async createBook(@Body() createBookDto: CreateBookDto, @Request() req) {
    return await this.booksService.createBook(createBookDto, req.user.id);
  }

  @Patch(':id')
  @Roles(UserRoles.MEMBER)
  @Version('1')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  @Roles(UserRoles.MEMBER)
  @Version('1')
  async delete(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}
