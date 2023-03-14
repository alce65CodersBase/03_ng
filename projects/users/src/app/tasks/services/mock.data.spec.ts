import { TestBed } from '@angular/core/testing';
import { TasksRepoService, getTasks } from './mock.data';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Task } from '../models/task.model';

describe('getTasks', () => {
  it('it should return the mock array', async () => {
    const result = await getTasks();
    expect(result.length).toBe(2);
  });
});

describe('TasksRepoService', () => {
  let service: TasksRepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksRepoService],
    });
    service = TestBed.inject(TasksRepoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use createTask', () => {
    const mockTasks: Task[] = [];
    service.createTask().subscribe((data) => expect(data).toEqual([]));
    const req = httpMock.expectOne('');
    expect(req.request.method).toEqual('POST');
    req.flush(mockTasks);
  });
});
