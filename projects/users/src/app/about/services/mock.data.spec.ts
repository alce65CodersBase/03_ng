import { TestBed } from '@angular/core/testing';
import { UsersRepoService, getUsers } from './mock.data';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '../../../models/user.model';

describe('getUsers', () => {
  it('it should return the mock array', async () => {
    const result = await getUsers();
    expect(result.length).toBe(2);
  });
});

describe('UsersRepoService', () => {
  let service: UsersRepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersRepoService],
    });
    service = TestBed.inject(UsersRepoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use createUser', () => {
    const mockUsers: User[] = [];
    service.createUser().subscribe((data) => expect(data).toEqual([]));
    const req = httpMock.expectOne('');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUsers);
  });
});
