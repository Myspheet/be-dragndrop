
import { Injectable } from '@nestjs/common';
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

  async findAll(user: UserEntity): Promise<TodoEntity[]> {
    // const { id } = user;
    const todos = await this.prismaService.todo.findMany({
        where: {
            userId: 4
        },
        orderBy: [
          {pos: 'asc'}
        ]
    })
    return todos;
  }

  async createTodo(createTodoDto: CreateTodoDto, user: UserEntity): Promise<TodoEntity> {
    const { title, description, status, pos } = createTodoDto;
    const { id } = user;
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
  }

  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const { id, ...todoData} = updateTodoDto;
    const todo = await this.prismaService.todo.update({
      where: {
        id
      },
      data: {
        ...todoData
      },
    });

    return todo;
  }

  async delete(id): Promise<TodoEntity> {
    return await this.prismaService.todo.delete({ where: { id } });
  }
}