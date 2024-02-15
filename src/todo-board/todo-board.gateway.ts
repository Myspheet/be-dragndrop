import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { TodosService } from 'src/todos/todos.service';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

@WebSocketGateway()
export class TodoBoardGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  user: UserEntity = {
    id: 4,
    name: "John Do",
    email: "promise@gmail.com",
    password: "Hello world",
  }

  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(private readonly todosService: TodosService) {}

  handleDisconnect(client: any) {
    console.log('clientid',client.id);

    this.connectedClients.delete(client.id)
    // throw new Error('Method not implemented.');
  }

  handleConnection(socket: Socket): void {
   const clientId = socket.id;
    this.connectedClients.set(clientId, socket);
    console.log('connected',this.connectedClients.size);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(client.id);
    return 'Hello world!';
  }

  // @UseGuards(AuthGuard())
  @SubscribeMessage('updateTodos')
  async handleUpdateTodos(client: any, payload: any) {
    const allTodos = await this.todosService.findAll(this.user);

    client.broadcast.emit("updatedTodo", allTodos);

    return allTodos;
  }

  @SubscribeMessage('createdTodo')
  async handleCreateTodo(client: any, payload: any) {
    const allTodos = await this.todosService.findAll(this.user);

    this.server.emit("updatedTodo", allTodos);

    return allTodos;
  }

  @SubscribeMessage('deleteTodo')
  async handleDeleteTodo(client: any, payload: any) {
    const allTodos = await this.todosService.findAll(this.user);

    this.server.emit("updatedTodo", allTodos);

    return allTodos;
  }

  @SubscribeMessage('todoUpdate')
  async handleUpdateTodo(client: any, payload: any) {
    const allTodos = await this.todosService.findAll(this.user);

    this.server.emit("updatedTodo", allTodos);

    return allTodos;
  }
}
