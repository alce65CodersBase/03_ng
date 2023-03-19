import { Component } from '@angular/core';
import { Course } from '../../models/courses';
import { CoursesRepoService } from '../services/courses.repo.service';

@Component({
  selector: 'sdi-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses: Course[];
  selectedCourse!: Course | null;

  constructor(private repoSrv: CoursesRepoService) {
    this.courses = [];
    this.repoSrv.getCoursesMock().subscribe((courses) => {
      this.courses = courses;
      this.selectedCourse = this.courses[0];
    });
  }

  selectCourse(course: Course | null) {
    this.selectedCourse = course;
  }
  deleteCourse(ev: Event, id: Course['id']) {
    ev.stopImmediatePropagation();
    this.courses = this.courses.filter((course) => course.id !== id);
    this.selectedCourse =
      this.selectedCourse?.id === id ? null : this.selectedCourse;
  }
}
