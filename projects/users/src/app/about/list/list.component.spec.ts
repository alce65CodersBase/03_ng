import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { AddComponent } from '../add/add.component';
import { CardComponent } from '../card/card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UsersService } from '../services/users.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

const noop = () => {
  // No operations
};

const mockUser: User = {
  id: 1,
  firstName: 'Test title',
  surname: 'Test owner',
  isAdmin: false,
};
const mockUsers: User[] = [mockUser];

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let debugElement: DebugElement;
  let mockUserService: UsersService;

  beforeEach(async () => {
    mockUserService = {
      greetings: noop,
      handleAdd: noop,
      users$: new BehaviorSubject([...mockUsers]),
    };

    await TestBed.configureTestingModule({
      declarations: [ListComponent, AddComponent, CardComponent],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should start with an empty 'users' array`, () => {
    // Test component implementation: constructor
    expect(component.users.length).toEqual(0);
  });

  it(`should load a 2 items 'users' array`, async () => {
    // Test component implementation: ngOnInit
    fixture.detectChanges();
    expect(component.users.length).toEqual(1);
  });

  it('should render a title', () => {
    // Test component render
    fixture.detectChanges();
    // HTML based mode
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.querySelector('h2')?.textContent?.toLowerCase()).toContain(
      'usuarios'
    );
    // Angular based mode
    const header: HTMLHeadElement = debugElement.query(
      By.css('h2')
    ).nativeElement;
    expect(header.textContent?.toLowerCase()).toContain('usuarios');
  });

  it('should add new user to the array', () => {
    fixture.detectChanges();
    component.handleAdd({} as User);
    expect(component.users.length).toBe(2);
  });

  it('should update a user from the array', () => {
    fixture.detectChanges();
    component.handleAdd({} as User);
    component.handleChange({
      id: 1,
      isAdmin: true,
    } as User);
    expect(component.users.length).toBe(2);
    expect(component.users[0].isAdmin).toBeTrue();
  });

  it('should delete a user from the array', () => {
    fixture.detectChanges();
    component.handleDelete(1);
    expect(component.users.length).toBe(0);
  });
});
