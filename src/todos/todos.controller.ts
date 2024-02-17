import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private readonly todosService: TodosService) {}


  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @GetUser() user: UserEntity) {
    return this.todosService.create(createTodoDto, user);
  }

  @Get()
  findAll(@GetUser() user: UserEntity) {
    return this.todosService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto, @GetUser() user: UserEntity) {
    return this.todosService.update(updateTodoDto, user, +id );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: UserEntity) {
    return this.todosService.remove(+id, user);
  }
}
