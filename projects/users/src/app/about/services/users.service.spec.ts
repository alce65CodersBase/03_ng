import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { User } from '../../../models/user.model';

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
    console.log = jasmine.createSpy('log');
    service.greetings();
    expect(console.log).toHaveBeenCalledWith('Hola');
  });

  it('should use handleAdd() for add new user to the state', () => {
    service.handleAdd({} as User);
    expect(service.users$.value.length).toBe(1);
  });

  it('should use handleChange() for update a user from the array', () => {
    service.handleAdd({ id: 1, isAdmin: false } as User);
    service.handleAdd({ id: 2, isAdmin: false } as User);
    service.handleChange({
      id: 1,
      isAdmin: true,
    } as User);
    expect(service.users$.value.length).toBe(2);
    expect(service.users$.value[0].isAdmin).toBeTrue();
  });

  it('should use handleDelete() delete for a user from the array', () => {
    //   fixture.detectChanges();
    service.handleAdd({ id: 1, isAdmin: false } as User);
    service.handleAdd({ id: 2, isAdmin: false } as User);
    service.handleDelete(1);
    expect(service.users$.value.length).toBe(1);
  });
});
