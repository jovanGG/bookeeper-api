import { Injectable } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async handleUserRegistration(userRegister: RegisterUserDto): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;

    return await user.save();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }
}
