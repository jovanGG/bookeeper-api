import { Controller, Post, Request, UseGuards, Version } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post()
  @Version('1')
  async login(@Request() req): Promise<any> {
    return req.user;
  }
}
