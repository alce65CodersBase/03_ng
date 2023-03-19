import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ControlsComponent } from 'projects/core/src/lib/controls/controls.component';
import { UserLogged } from '../../models/user.model';
import { UserComponent } from './user.component';
import { UserStateService } from '../services/user.state.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

const mockService: UserStateService = {
  userLogged$: new BehaviorSubject(null),
} as unknown as UserStateService;

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let debugElement: DebugElement;
  let service: UserStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ControlsComponent,
      ],
      providers: [
        {
          provider: UserStateService,
          useValue: mockService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(UserStateService);
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create when user is ', () => {
    expect(component).toBeTruthy();
  });

  it('should have a "login" state', () => {
    component.userStateSrv.userLogged$.subscribe(() => {
      expect(component.state).toBe('login');
    });
  });

  it('should have a "logout" state', () => {
    service.userLogged$.next({} as UserLogged);
    component.userStateSrv.userLogged$.subscribe(() => {
      expect(component.state).toBe('logout');
    });
  });

  it('should change the state when user click the button', () => {
    const buttonDebug = debugElement.query(By.css('[role="button"]'));
    buttonDebug.triggerEventHandler('click');
    expect(component.state).toBe('register');
  });
});
