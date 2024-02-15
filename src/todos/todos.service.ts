import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { todoData, setTodoData } from 'src/data';
import { TodoRepository } from './todos.repository';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
   todoDataObj = todoData;

   constructor(private readonly todoRepository: TodoRepository) {}

  create(createTodoDto: CreateTodoDto, user: UserEntity) {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  async findAll(user: UserEntity ) {
    return await this.todoRepository.findAll(user);
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(updateTodoDto: UpdateTodoDto, id?: number) {
    const todo = await this.todoRepository.updateTodo({id, ...updateTodoDto});
    return todo;
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
