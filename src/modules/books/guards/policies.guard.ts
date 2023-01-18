import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { BooksService } from 'src/modules/books/books.service';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private bookService: BooksService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const book = await this.bookService.getBook(request.params.id);

    if (book.user.id === request.user.id) {
      return true;
    }

    return false;
  }
}
