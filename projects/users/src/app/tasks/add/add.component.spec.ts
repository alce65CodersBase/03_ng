import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AddComponent } from './add.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

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
    spyOn(component, 'handleSubmit').and.callThrough();
    fixture.detectChanges();
    const formDebug = debugElement.query(By.css('form'));
    // const form: HTMLFormElement = formDebug.nativeElement;
    component.newTaskForm.get('title')?.setValue('Title');
    component.newTaskForm.get('owner')?.setValue('Owner');
    component.added.subscribe((newTask) => {
      expect(newTask.title).toBe('Title');
      expect(newTask.owner).toBe('Owner');
    });
    // Act
    formDebug.triggerEventHandler('submit');
    fixture.detectChanges();
    // Assert
    expect(component.handleSubmit).toHaveBeenCalled();
  });
});
