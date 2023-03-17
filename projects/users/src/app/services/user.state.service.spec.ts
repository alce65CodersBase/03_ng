import { TestBed } from '@angular/core/testing';
import { UserStateService } from './user.state.service';
import { UserRepoService } from './user.repo.service';
import { UserLogin, UserRegister } from '../../models/user.model';
import { of } from 'rxjs';

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

  // it('should use loadProfile', () => {
  //   //
  // });

  it('should use register', () => {
    const mockRegisterData: UserRegister = {} as UserRegister;
    service.register(mockRegisterData);
    service.userLogged$.subscribe((state) => {
      expect(state?.email).toBe(mockRegisterData.email);
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

  it('should use logout', () => {
    service.logout();
    service.userLogged$.subscribe((state) => {
      expect(state).toBeNull();
    });
  });
});
