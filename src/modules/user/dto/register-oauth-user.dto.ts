import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterOauthUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
