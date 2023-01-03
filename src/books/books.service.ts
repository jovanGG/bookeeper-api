import { Injectable } from '@nestjs/common';
import { Book } from './entities/books.entity';

@Injectable()
export class BooksService {
  private books: Book[] = [];
}
