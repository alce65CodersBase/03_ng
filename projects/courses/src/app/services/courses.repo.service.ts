import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Course } from '../../models/courses';

@Injectable({
  providedIn: 'root',
})
export class CoursesRepoService {
  constructor() {
    //
  }

  getCoursesMock() {
    const coursesMock: Course[] = [
      {
        id: 1,
        title: 'Angular 13 Fundamentals',
        description: 'Learn the fundamentals of Angular 13',
        percentComplete: 26,
        favorite: true,
      },
      {
        id: 2,
        title: 'JavaScript The HARDEST PARTS EVER!',
        description: 'Learn the JavaScript like a pro! with Will',
        percentComplete: 26,
        favorite: true,
      },
    ];
    return of(coursesMock);
  }
}
