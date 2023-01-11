import { IsString } from 'class-validator';

export default class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly genres: string[];
}
