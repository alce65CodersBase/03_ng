import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Task } from '../models/task.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  const mockTask: Task = {
    id: 1,
    title: '',
    owner: '',
    isCompleted: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update a task', () => {
    // Arrange
    spyOn(component, 'handleChange').and.callThrough();
    component.task.isCompleted = false;
    component.changed.subscribe((task) => {
      component.task = task;
      expect(component.task.isCompleted).toBeTrue();
    });
    const check = debugElement.query(By.css('input'));
    // Act
    check.triggerEventHandler('change');
    fixture.detectChanges();
    // Assert
    expect(component.handleChange).toHaveBeenCalled();
  });

  it('should delete a task', () => {
    // Arrange
    let deletedId = 0;
    component.task.id = 1;
    spyOn(component, 'handleDelete').and.callThrough();
    const deleteButton = debugElement.query(By.css('button'));
    component.deleted.subscribe((id) => {
      deletedId = id;
      expect(deletedId).toBe(1);
    });
    // Act
    deleteButton.triggerEventHandler('click');
    fixture.detectChanges();
    // Assert
    expect(component.handleDelete).toHaveBeenCalled();
  });
});
