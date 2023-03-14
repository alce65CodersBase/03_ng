import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use greetings()', () => {
    service.greetings();
  });

  it('should use handleAdd()', () => {
    service.handleAdd({} as User);
    expect(service.users$.value.length).toBe(1);
  });
});
