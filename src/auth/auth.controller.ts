import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginCredentialsDto } from './dto/login-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialsDto): Promise<UserEntity> {
      return this.authService.signUp(authCredentialDto);
    }
  
    @Post('/signin')
    signIn(
      @Body() authCredentialsDto: LoginCredentialsDto,
    ): Promise<{ accessToken: string }> {
      return this.authService.signIn(authCredentialsDto);
    }
}
