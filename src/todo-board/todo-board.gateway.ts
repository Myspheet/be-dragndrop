import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { TodosService } from 'src/todos/todos.service';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { TodoRepository } from 'src/todos/todos.repository';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

@WebSocketGateway()
export class TodoBoardGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly todoRepository: TodoRepository, private jwtService: JwtService) {}

  @SubscribeMessage('updateTodos')
  async handleUpdateTodos(client: any, payload: any) {
    const id = this.getUserId(payload);

    if(id){
      return this.emitUpdateTodo(id);
    }

    return;
  }

  @SubscribeMessage('createdTodo')
  async handleCreateTodo(client: any, payload: any) {
    const id = this.getUserId(payload);

    if(id){
      return this.emitUpdateTodo(id);
    }

    return;
  }

  @SubscribeMessage('deleteTodo')
  async handleDeleteTodo(client: any, payload: any) {
    const id = this.getUserId(payload);

    if(id){
      return this.emitUpdateTodo(id);
    }

    return;
  }

  @SubscribeMessage('todoUpdate')
  async handleUpdateTodo(client: any, payload: any) {
    const id = this.getUserId(payload);

    if(id){
      return this.emitUpdateTodo(id);
    }

    return [];
  }

  private async emitUpdateTodo(id) {
    const allTodos = await this.todoRepository.findAll(id);

    this.server.emit("updatedTodo", allTodos);

    return allTodos;
  }

  private getUserId(payload): number {
     const { id } = this.jwtService.decode(payload);
     return id;
  }
}
