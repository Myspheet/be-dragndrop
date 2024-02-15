import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await this.prismaService.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
          },
        });
  
      return this.exclude(user, ['password']);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          throw new HttpException("User with email already exists", 400);
        }
      }
    }
  }

  async getAllTodos(): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany();
  }

  async findOneBy(user: Partial<UserEntity>): Promise<Omit<UserEntity, 'password'>> {
    return await this.prismaService.user.findUnique({ where: { ...user as Prisma.UserWhereUniqueInput}, select: {
      email: true,
      id: true,
      name: true,
    } });
  }


  async signIn({ email }): Promise<UserEntity> {
    return await this.prismaService.user.findUnique({ where: {email}});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  async delete(id): Promise<UserEntity> {
    return await this.prismaService.user.delete({ where: { id } });
  }

  private exclude (
    user: UserEntity,
    keys
  ) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    ) as UserEntity;
  }
}
