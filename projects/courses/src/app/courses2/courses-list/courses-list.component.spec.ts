import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MaterialModule } from '../../material.module';
import { CoursesListComponent } from './courses-list.component';
import { Course } from 'projects/courses/src/models/courses';

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Test course 1',
  } as Course,
  {
    id: '2',
    title: 'Test course 2',
  } as Course,
];

const mockEvent = {
  stopImmediatePropagation: () => null,
};

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.courses = mockCourses;
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
});
