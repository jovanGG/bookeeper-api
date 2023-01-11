import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { SETTINGS } from 'src/common/utils/constants';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @Version('1')
  handleUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE) userRegister: RegisterUserDto,
  ): Promise<User> {
    return this.userService.handleUserRegistration(userRegister);
  }

  @Get(':id')
  @Version('1')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Get(':id')
  @Version('1')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }
}
