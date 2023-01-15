import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { RegisterOauthUserDto } from './dto/register-oauth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async handleUserRegistration(userRegister: RegisterUserDto): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = await bcrypt.hash(userRegister.password, 10);

    return await user.save();
  }

  async handleOauthUserRegistration(
    userRegister: RegisterOauthUserDto,
  ): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;

    return await user.save();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      relations: {
        books: true,
      },
    });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        books: true,
      },
    });
  }
}
