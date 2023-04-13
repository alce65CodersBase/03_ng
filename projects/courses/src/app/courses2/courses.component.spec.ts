import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';

import { CoursesComponent } from './courses.component';
import { Course } from '../../models/courses';
import { CoursesApiRepoService } from '../services/courses.api.repo.service';

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

const mockRepoService = jasmine.createSpyObj<CoursesApiRepoService>(
  'CoursesApiRepoService',
  {
    loadItems: of(mockCourses),
    getItem: of(mockCourses[0]),
    createItem: of(mockCourses[0]),
    updateItem: of(mockCourses[0]),
    deleteItem: of(undefined),
    url: 'http://testing',
  }
);

describe('Given CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [
        FormsModule,
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: CoursesApiRepoService,
          useValue: mockRepoService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  describe('When it is instantiate', () => {
    it('should create and load all courses', () => {
      spyOn(component, 'getAllCourses').and.callThrough();
      expect(component).toBeTruthy();
      expect(component.courses).toEqual([]);
      fixture.detectChanges();
      expect(component.getAllCourses).toHaveBeenCalled();
      expect(mockRepoService.loadItems).toHaveBeenCalled();
    });
  });

  describe('When the initial data are loaded and all repo responses are OK', () => {
    beforeEach(() => {
      component.courses = mockCourses;
      fixture.detectChanges();
    });

    it('should select a course in response to the event selected', () => {
      spyOn(component, 'selectCourse').and.callThrough();
      const debugCoursesList = debugElement.query(By.css('sdi-courses-list'));
      debugCoursesList.triggerEventHandler('selected', mockCourses[0]);
      expect(component.selectCourse).toHaveBeenCalled();
    });

    it('should delete a course in response to the event deleted', () => {
      spyOn(component, 'deleteCourse').and.callThrough();
      const debugCoursesList = debugElement.query(By.css('sdi-courses-list'));
      debugCoursesList.triggerEventHandler('deleted', mockCourses[0].id);
      expect(component.deleteCourse).toHaveBeenCalled();
      expect(mockRepoService.deleteItem).toHaveBeenCalled();
    });

    it('should try to delete an invalid id', () => {
      component.deleteCourse('2');
      expect(mockRepoService.deleteItem).toHaveBeenCalled();
      // expect(component.selectedCourse).toBeNull();
    });

    it('should save a new course in response to the event saved', () => {
      component.selectedCourse = {} as Course;
      spyOn(component, 'saveCourse').and.callThrough();
      spyOn(component, 'addCourse').and.callThrough();
      console.log = jasmine.createSpy('log');
      const debugCoursesDetails = debugElement.query(
        By.css('sdi-courses-details')
      );
      debugCoursesDetails.triggerEventHandler('saved');
      expect(component.saveCourse).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Add');
      expect(component.addCourse).toHaveBeenCalled();
      expect(mockRepoService.createItem).toHaveBeenCalled();
    });

    it('should save a edited course in response to the event saved', () => {
      component.selectedCourse = mockCourses[0];
      spyOn(component, 'saveCourse').and.callThrough();
      spyOn(component, 'updateCourse').and.callThrough();
      console.log = jasmine.createSpy('log');
      const debugCoursesDetails = debugElement.query(
        By.css('sdi-courses-details')
      );
      debugCoursesDetails.triggerEventHandler('saved');
      expect(component.saveCourse).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Update');
      expect(component.updateCourse).toHaveBeenCalled();
      expect(mockRepoService.updateItem).toHaveBeenCalled();
    });

    it('should reset to null the selected course in response to the event saved', () => {
      spyOn(component, 'resetCourse').and.callThrough();
      const debugCoursesDetails = debugElement.query(
        By.css('sdi-courses-details')
      );
      debugCoursesDetails.triggerEventHandler('reseated');
      expect(component.resetCourse).toHaveBeenCalled();
      expect(component.selectedCourse).toEqual({
        id: '',
        title: '',
        description: '',
        percentComplete: 0,
        favorite: false,
      });
    });
  });

  describe('When there are NOT a selected course', () => {
    beforeEach(() => {
      console.log = jasmine.createSpy('log');
      fixture.detectChanges();
      component.selectedCourse = null;
    });
    it('should NOT call repo method for update course', () => {
      component.updateCourse();
      expect(console.log).toHaveBeenCalledWith('NOT possible update');
    });
    it('should NOT call repo method for create course', () => {
      component.addCourse();
      expect(console.log).toHaveBeenCalledWith('NOT possible create');
    });
  });

  describe('When the initial data are loaded and all repo responses are Errors', () => {
    it('should receive an error when try to load all courses', () => {
      mockRepoService.loadItems = jasmine
        .createSpy()
        .and.returnValue(throwError(() => 'Loading Error'));
      console.log = jasmine.createSpy('log');
      spyOn(component, 'getAllCourses').and.callThrough();
      fixture.detectChanges();
      expect(component.getAllCourses).toHaveBeenCalled();
      expect(mockRepoService.loadItems).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Loading Error');
    });

    it('should receive an error when try to delete courses', () => {
      mockRepoService.deleteItem = jasmine
        .createSpy()
        .and.returnValue(throwError(() => 'Deleting Error'));
      console.log = jasmine.createSpy('log');
      component.deleteCourse('1');
      fixture.detectChanges();
      expect(mockRepoService.deleteItem).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Deleting Error');
    });

    it('should receive an error when try to update courses', () => {
      mockRepoService.updateItem = jasmine
        .createSpy()
        .and.returnValue(throwError(() => 'Updating Error'));
      console.log = jasmine.createSpy('log');
      component.updateCourse();
      fixture.detectChanges();
      expect(mockRepoService.updateItem).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Updating Error');
    });

    it('should receive an error when try to adding courses', () => {
      mockRepoService.createItem = jasmine
        .createSpy()
        .and.returnValue(throwError(() => 'Adding Error'));
      console.log = jasmine.createSpy('log');
      component.addCourse();
      fixture.detectChanges();
      expect(mockRepoService.createItem).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Adding Error');
    });
  });
});
