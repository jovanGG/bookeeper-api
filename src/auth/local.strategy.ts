import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validateUser(email: string, password: string) {
    /* const user = await this.authService.validateUserCreds(email, password);
    if (!user) throw new UnauthorizedException();
    return user; */
  }
}
