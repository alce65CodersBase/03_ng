import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { UsersService } from '../about/services/users.service';
import { HomeService } from './services/home.service';
import { User } from '../about/models/user.model';

const mockUser: User = {
  id: 1,
  firstName: 'First name',
  surname: 'Surname',
  isAdmin: false,
};
const mockUsers: User[] = [mockUser];

const noop = () => {
  // No operations
};

const mockHomeService: HomeService = {
  greetings: noop,
};

const mockUserService: UsersService = {
  users$: new BehaviorSubject([...mockUsers]),
} as UsersService;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let service1: HomeService;
  let service2: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: HomeService,
          useValue: mockHomeService,
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();
    service1 = TestBed.inject(HomeService);
    service2 = TestBed.inject(UsersService);
    spyOn(service1, 'greetings').and.callThrough();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service method', () => {
    expect(service1.greetings).toHaveBeenCalled();
  });

  it('should render the data of the service', () => {
    const pElement: HTMLParagraphElement = debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(pElement.innerText).toContain(String(mockUsers.length));
  });
});
