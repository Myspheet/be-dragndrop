import { Module } from '@nestjs/common';
import { TodoBoardGateway } from './todo-board.gateway';
import { TodosService } from 'src/todos/todos.service';
import { TodosModule } from 'src/todos/todos.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TodosModule, AuthModule],
    providers: [TodoBoardGateway, TodosService],
  })
export class TodoBoardModule {}
