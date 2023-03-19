import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserRepoService } from './user.repo.service';
import { UserLogin, UserRegister } from '../../models/user.model';

describe('UserRepoService', () => {
  let service: UserRepoService;
  let httpClientMock: HttpTestingController;
  const url = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRepoService],
    });
    service = TestBed.inject(UserRepoService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpClientMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createRegister send the register data', () => {
    const mockRegisterData: UserRegister = {} as UserRegister;
    service.createRegister(mockRegisterData).subscribe((data) => {
      expect(data).toEqual(mockRegisterData);
    });

    const req = httpClientMock.expectOne(url + '/registration');
    expect(req.request.method).toEqual('POST');
    req.flush(mockRegisterData);
  });

  it('sendLoginData send the register data', () => {
    const mockLoginData: UserLogin = {} as UserLogin;
    service.sendLoginData(mockLoginData).subscribe((data) => {
      expect(data).toEqual(mockLoginData);
    });

    const req = httpClientMock.expectOne(url + '/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockLoginData);
  });
});
