import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TasksService } from '../services/tasks.service';
import { ReactiveFormsModule } from '@angular/forms';

const noop = () => {
  // No operations
};

const mockTaskService: TasksService = {
  handleAdd: noop,
} as unknown as TasksService;

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let debugElement: DebugElement;
  let service: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(TasksService);
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
    (form[0] as HTMLInputElement).value = 'Title';
    (form[1] as HTMLInputElement).value = 'Owner';
    // Act
    formDebug.triggerEventHandler('submit');
    // Assert
    expect(service.handleAdd).toHaveBeenCalled();
  });
});
