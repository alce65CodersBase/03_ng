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
  selectedCourse!: Course;

  constructor(private repoSrv: CoursesRepoService) {
    this.courses = [];
    this.repoSrv.getCoursesMock().subscribe((courses) => {
      this.courses = courses;
      this.selectedCourse = this.courses[0];
    });
  }

  selectCourse(course: Course | null) {
    //
  }
  deleteCourse(id: Course['id']) {
    //
  }
}
