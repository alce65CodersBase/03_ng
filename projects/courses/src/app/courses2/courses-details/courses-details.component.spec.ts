import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CoursesDetailsComponent } from './courses-details.component';
import { Course } from 'projects/courses/src/models/courses';

describe('CoursesDetailsComponent', () => {
  let component: CoursesDetailsComponent;
  let fixture: ComponentFixture<CoursesDetailsComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesDetailsComponent],
      imports: [FormsModule, MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesDetailsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create with a course', () => {
    component.course = {
      id: '1',
      title: 'Test course 1',
    } as Course;
    expect(component).toBeTruthy();
  });

  it('should create with a course', () => {
    component.course = null;
    expect(component).toBeTruthy();
  });

  it('should click for save a new course', () => {
    //   component.selectedCourse = {} as Course;
    spyOn(component, 'saveCourse').and.callThrough();
    //   spyOn(component, 'addCourse').and.callThrough();
    //   console.log = jasmine.createSpy('log');
    const debugForm = debugElement.query(By.css('form'));
    debugForm.triggerEventHandler('submit');
    expect(component.saveCourse).toHaveBeenCalled();
    //   expect(console.log).toHaveBeenCalledWith('Add');
    //   expect(component.addCourse).toHaveBeenCalled();
    //   expect(mockRepoService.createItem).toHaveBeenCalled();
  });

  it('should click for save a edited course', () => {
    //   component.selectedCourse = mockCourses[0];
    //   spyOn(component, 'saveCourse').and.callThrough();
    //   spyOn(component, 'updateCourse').and.callThrough();
    //   console.log = jasmine.createSpy('log');
    const debugForm = debugElement.query(By.css('form'));
    debugForm.triggerEventHandler('submit');
    //   expect(component.saveCourse).toHaveBeenCalled();
    //   expect(console.log).toHaveBeenCalledWith('Update');
    //   expect(component.updateCourse).toHaveBeenCalled();
    //   expect(mockRepoService.updateItem).toHaveBeenCalled();
  });

  it('should click for reset to null the selected course', () => {
    spyOn(component, 'resetCourse').and.callThrough();
    const debugButton = debugElement.query(By.css('button.cancel-button'));
    debugButton.triggerEventHandler('click');
    expect(component.resetCourse).toHaveBeenCalled();
  });
});
