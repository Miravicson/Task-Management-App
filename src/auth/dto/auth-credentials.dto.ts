import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { getPasswordRegex } from '../../constants';

export class AuthCredentialsDto {
  @ApiProperty({
    minimum: 4,
    maximum: 20,
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    minimum: 8,
    maximum: 32,
    type: String,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(getPasswordRegex(), { message: 'password is too weak' })
  password: string;
}
