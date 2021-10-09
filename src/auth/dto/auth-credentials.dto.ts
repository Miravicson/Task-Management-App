import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { getPasswordRegex } from 'src/constants';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(getPasswordRegex(), { message: 'password is too weak' })
  password: string;
}
