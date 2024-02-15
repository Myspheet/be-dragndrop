import { Test, TestingModule } from '@nestjs/testing';
import { TodoBoardGateway } from './todo-board.gateway';

describe('TodoBoardGateway', () => {
  let gateway: TodoBoardGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoBoardGateway],
    }).compile();

    gateway = module.get<TodoBoardGateway>(TodoBoardGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
