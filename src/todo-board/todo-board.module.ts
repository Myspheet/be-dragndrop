import { Module } from '@nestjs/common';
import { TodoBoardGateway } from './todo-board.gateway';
import { TodosService } from 'src/todos/todos.service';
import { TodosModule } from 'src/todos/todos.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TodosModule, AuthModule],
    providers: [TodoBoardGateway, TodosService, JwtService],
  })
export class TodoBoardModule {}
