import { TestBed, inject } from '@angular/core/testing';
import { UserStateService } from './user.state.service';
import { UserRepoService } from './user.repo.service';
import { UserLogin, UserRegister } from '../../models/user.model';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

const mockUserRepoService: UserRepoService = {
  createRegister: (userRegister: UserRegister) => {
    return of({ ...userRegister });
  },
  sendLoginData: (userLogin: UserLogin) => {
    return of({ ...userLogin });
  },
} as unknown as UserRepoService;

describe('UserService', () => {
  let service: UserStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: UserRepoService,
          useValue: mockUserRepoService,
        },
      ],
    });
    service = TestBed.inject(UserStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use loadProfile', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigateByUrl').and.stub();
    service.loadProfile();
    expect(spy.calls.first().args[0]).toContain('user');
  }));

  it('should use register', () => {
    mockUserRepoService.createRegister = (userRegister: UserRegister) => {
      return of({ ...userRegister });
    };
    const mockRegisterData: UserRegister = {} as UserRegister;
    console.log = jasmine.createSpy('log');
    service.register(mockRegisterData);
    service.userLogged$.subscribe(() => {
      expect(console.log).toHaveBeenCalledWith('Registration OK');
    });
  });

  it('should catch an error in register', () => {
    const errorMessage = 'Invalid register';
    mockUserRepoService.createRegister = () => {
      return throwError(() => new Error(errorMessage));
    };
    const mockRegisterData: UserRegister = {} as UserRegister;
    console.error = jasmine.createSpy('error');
    service.register(mockRegisterData);
    service.userLogged$.subscribe(() => {
      expect(console.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it('should use login', () => {
    const mockLoginData: UserLogin = {
      email: 'test@test.com',
    } as UserLogin;
    service.login(mockLoginData);
    service.userLogged$.subscribe((state) => {
      expect(state?.email).toEqual(mockLoginData.email);
    });
  });

  it('should catch an error in login without email', () => {
    const errorMessage = 'Invalid data from server';
    const mockLoginData: UserLogin = {} as UserLogin;
    console.error = jasmine.createSpy('error');
    service.login(mockLoginData);
    service.userLogged$.subscribe(() => {
      expect(console.error).not.toHaveBeenCalledWith(errorMessage);
    });
  });

  it('should make error for login', () => {
    const result = service.makeError();
    expect(result.message).toBe('Invalid data from server');
  });

  it('should catch an error in login', () => {
    const errorMessage = 'Invalid login';
    const mockLoginData: UserLogin = {} as UserLogin;
    const mockCall = spyOn(
      mockUserRepoService,
      'sendLoginData'
    ).and.returnValue(throwError(() => new Error(errorMessage)));
    console.error = jasmine.createSpy('error');
    service.login(mockLoginData);
    expect(mockCall).toHaveBeenCalled();
    service.userLogged$.subscribe(() => {
      expect(console.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it('should use logout', () => {
    service.logout();
    service.userLogged$.subscribe((state) => {
      expect(state).toBeNull();
    });
  });
});
