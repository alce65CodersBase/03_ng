import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UsersService } from '../services/users.service';
import { ReactiveFormsModule } from '@angular/forms';

const noop = () => {
  // No operations
};

const mockUserService: UsersService = {
  handleAdd: noop,
} as unknown as UsersService;

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let debugElement: DebugElement;
  let service: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(UsersService);
    spyOn(service, 'handleAdd').and.callThrough();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete the form', () => {
    // Arrange
    component.isDisplayForm = true;
    fixture.detectChanges();
    const formDebug = debugElement.query(By.css('form'));
    const form: HTMLFormElement = formDebug.nativeElement;
    (form[0] as HTMLInputElement).value = 'FirstName';
    (form[1] as HTMLInputElement).value = 'Surname';
    // Act
    formDebug.triggerEventHandler('submit');
    // Assert
    expect(service.handleAdd).toHaveBeenCalled();
  });
});
