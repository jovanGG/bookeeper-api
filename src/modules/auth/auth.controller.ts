import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';

import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Version('1')
  async loginUser(@Request() req): Promise<any> {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(GoogleOauthGuard)
  @Get('google')
  @Version('1')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @UseGuards(GoogleOauthGuard)
  @Get('google/redirect')
  @Version('1')
  async googleAuthCallback(@Request() req) {
    const validUser = await this.authService.validateGoogleCredentials(
      req.user,
    );

    return this.authService.generateToken(validUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @Version('1')
  async getCurrentUser(@Request() req): Promise<any> {
    return req.user;
  }
}
