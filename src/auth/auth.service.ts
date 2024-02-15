import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/users/users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
      ) {}
    
      async signUp(authCredentialsDto: AuthCredentialsDto): Promise<UserEntity> {
        return this.userRepository.create(authCredentialsDto as CreateUserDto);
      }
    
      async signIn(
        authCredentialDto: AuthCredentialsDto,
      ): Promise<{ accessToken: string }> {
        const { email, password } = authCredentialDto;
        const user = await this.userRepository.signIn({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const { id } = user;
          const payload: JwtPayload = { email, id };
          const accessToken = await this.jwtService.sign(payload, { secret: process.env.JWT_SECRET});
          return { accessToken };
        } else {
          throw new UnauthorizedException('Please check your username or password');
        }
      }
}
