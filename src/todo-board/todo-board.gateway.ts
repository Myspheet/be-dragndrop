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
export class TodoBoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly connectedClients: Map<number, string[]> = new Map();

  constructor(private readonly todoRepository: TodoRepository, private jwtService: JwtService) {}

  handleConnection(client: any, ...args: any[]) {
    const clientId = client.id;
    const userId = this.getUserId(client.handshake?.auth?.userToken);
    client.join(`${userId}`);

    // if(userId) {
    //   const userSockets = this.connectedClients.get(userId) || [];

    //   if( userSockets.length == 0 && !(clientId in userSockets)) {
    //     userSockets.push(clientId);
    //     this.connectedClients.set(userId, userSockets);
    //   }
    // }

    // console.log(this.connectedClients);
  }

  handleDisconnect(client: any) {
    const userId = this.getUserId(client.handshake?.auth?.userToken);

    client.leave(`${userId}`);
  }

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

    console.log(id);
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
    const userSockets = this.connectedClients.get(id);

    this.server.to(`${id}`).emit("updatedTodo", allTodos);

    return allTodos;
  }

  private getUserId(payload): number {
     const { id  } = this.jwtService.decode(payload) || {};
     return id;
  }
}
