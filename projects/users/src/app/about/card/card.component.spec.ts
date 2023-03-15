import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

const noop = () => {
  // No operations
};

const mockUserService: UsersService = {
  handleChange: noop,
  handleDelete: noop,
} as unknown as UsersService;

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;
  let service: UsersService;

  const mockUser: User = {
    id: 1,
    firstName: '',
    surname: '',
    isAdmin: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(UsersService);
    spyOn(service, 'handleChange').and.callThrough();
    spyOn(service, 'handleDelete').and.callThrough();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.user = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update a user', () => {
    // Arrange
    component.user.isAdmin = false;
    const check = debugElement.query(By.css('input'));
    // Act
    check.triggerEventHandler('change');
    fixture.detectChanges();
    // Assert
    expect(service.handleChange).toHaveBeenCalled();
  });

  it('should delete a user', () => {
    // Arrange
    component.user.id = 1;
    spyOn(component, 'handleDelete').and.callThrough();
    const deleteButton = debugElement.query(By.css('button'));
    // Act
    deleteButton.triggerEventHandler('click');
    fixture.detectChanges();
    // Assert
    expect(service.handleDelete).toHaveBeenCalled();
  });
});
