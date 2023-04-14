import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Course } from '../../models/courses';
import { Lesson } from '../../models/lessons';

@Injectable({
  providedIn: 'root',
})
export class CoursesRepoService {
  getCoursesMock() {
    const coursesMock: Course[] = [
      {
        id: '1',
        title: 'Angular 13 Fundamentals',
        description: 'Learn the fundamentals of Angular 13',
        percentComplete: 26,
        favorite: true,
      },
      {
        id: '2',
        title: 'JavaScript The HARDEST PARTS EVER!',
        description: 'Learn the JavaScript like a pro! with Will',
        percentComplete: 6,
        favorite: true,
      },
      {
        id: '3',
        title: 'Rapid Application Development Patterns',
        description: 'This must be done by 3:30 or else! Don`t forget!',
        percentComplete: 98,
        favorite: true,
      },
    ];
    return of(coursesMock);
  }

  getLessonsMock() {
    const lessonsMock: Lesson[] = [
      { title: 'Hello Angular', id: '1' },
      { title: 'Component Fundamentals', id: '2' },
      { title: 'Template Driven Forms', id: '3' },
      { title: 'Angular Services', id: '4' },
      { title: 'Server Communication', id: '5' },
      { title: 'Component Driven Architecture', id: '6' },
      { title: 'Angular Routing', id: '7' },
      { title: 'Unit Testing Fundamentals', id: '8' },
    ];
    return of(lessonsMock);
  }
}
