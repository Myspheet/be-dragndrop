import { Test, TestingModule } from '@nestjs/testing';
import { TodoBoardService } from './todo-board.service';

describe('TodoBoardService', () => {
  let service: TodoBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoBoardService],
    }).compile();

    service = module.get<TodoBoardService>(TodoBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
