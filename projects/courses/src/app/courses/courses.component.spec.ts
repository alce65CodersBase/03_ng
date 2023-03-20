import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { MaterialModule } from '../material.module';
import { Course } from '../../models/courses';

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
      imports: [MaterialModule],
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
    const debugButton = debugElement.query(By.css('button'));
    debugButton.triggerEventHandler('click', mockEvent);
    expect(component.deleteCourse).toHaveBeenCalled();
  });

  it('should try to delete an invalid id', () => {
    component.deleteCourse(mockEvent as unknown as Event, 2);
    expect(component.selectedCourse).not.toBeNull();
  });
});
