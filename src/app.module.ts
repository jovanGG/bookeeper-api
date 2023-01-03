import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { BooksModule } from './books/books.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import server from './config/server';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [server],
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
