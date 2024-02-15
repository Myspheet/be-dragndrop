import { IsEmail, IsString, Matches, MaxLength, MinLength, IsEmpty, IsOptional } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
