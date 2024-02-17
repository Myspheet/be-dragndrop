
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Prisma, User } from '@prisma/client';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll(id: number): Promise<TodoEntity[]> {
    try {
      const todos = await this.prismaService.todo.findMany({
          where: {
              userId: id
          },
          orderBy: [
            {pos: 'asc'}
          ]
      })
      return todos;
    } catch (error) {
      throw new HttpException('There was an error', 500);
    }
  }

  async createTodo(createTodoDto: CreateTodoDto, id: number): Promise<TodoEntity> {
    try {
      const { title, description, status, pos } = createTodoDto;
      const todo = await this.prismaService.todo.create({
          data: {
              title,
              status,
              description,
              userId: id,
              pos
          }
      });
  
      return todo;

    } catch (error) {
      throw new HttpException('There was an error', 500);
    }
  }

  async updateTodo(updateTodoDto: UpdateTodoDto, user: UserEntity): Promise<TodoEntity> {
    try {
      const { id, ...todoData} = updateTodoDto;
      const todo = await this.prismaService.todo.update({
        where: {
          id,
          userId: user.id
        },
        data: {
          ...todoData
        },
      });

      return todo;
    } catch (error) {
      throw new HttpException('Not Found', 404);
    }
  }

  async delete(id, user): Promise<TodoEntity> {
    try {
      return await this.prismaService.todo.delete({ where: { id, userId: user.id } });
    } catch (error) {
      throw new HttpException('Not Found', 404);
    }
  }
}
