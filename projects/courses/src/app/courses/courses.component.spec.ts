import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { Course } from '../../models/courses';
import { MaterialModule } from '../material.module';

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Test course',
  } as Course,
];

const mockEvent = {
  stopImmediatePropagation: () => null,
};

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [FormsModule, MaterialModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    component.courses = mockCourses;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click for select a course', () => {
    spyOn(component, 'selectCourse').and.callThrough();
    const debugButton = debugElement.query(By.css('[role="button"]'));
    debugButton.triggerEventHandler('click', mockEvent);
    expect(component.selectCourse).toHaveBeenCalled();
  });

  it('should click for delete a course', () => {
    spyOn(component, 'deleteCourse').and.callThrough();
    const debugButton = debugElement.query(By.css('button.delete-button'));
    debugButton.triggerEventHandler('click', mockEvent);
    expect(component.deleteCourse).toHaveBeenCalled();
  });

  it('should try to delete an invalid id', () => {
    component.deleteCourse(mockEvent as unknown as Event, 2);
    expect(component.selectedCourse).not.toBeNull();
  });

  it('should click for save a edited course', () => {
    spyOn(component, 'saveCourse').and.callThrough();
    console.log = jasmine.createSpy('log');
    const debugForm = debugElement.query(By.css('form'));
    debugForm.triggerEventHandler('submit');
    expect(component.saveCourse).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });

  it('should click for reset to null the selected course', () => {
    spyOn(component, 'resetCourse').and.callThrough();
    const debugButton = debugElement.query(By.css('button.cancel-button'));
    debugButton.triggerEventHandler('click');
    expect(component.resetCourse).toHaveBeenCalled();
    expect(component.selectedCourse).toEqual({
      id: 0,
      title: '',
      description: '',
      percentComplete: 0,
      favorite: false,
    });
  });
});
