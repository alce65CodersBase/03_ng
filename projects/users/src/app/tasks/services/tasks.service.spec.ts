import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { Task } from '../models/task.model';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use greetings()', () => {
    service.greetings();
  });

  it('should use handleAdd()', () => {
    service.handleAdd({} as Task);
    expect(service.tasks$.value.length).toBe(1);
  });
});
