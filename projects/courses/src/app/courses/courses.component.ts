import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/courses';
import { CoursesRepoService } from '../services/courses.repo.service';

const initialCourse: Course = {
  id: 0,
  title: '',
  description: '',
  percentComplete: 0,
  favorite: false,
};

@Component({
  selector: 'sdi-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  selectedCourse!: Course | null;
  title!: string;

  constructor(private repoSrv: CoursesRepoService) {
    this.courses = [];
    this.selectedCourse = initialCourse;
  }

  ngOnInit(): void {
    this.repoSrv.getCoursesMock().subscribe((courses) => {
      this.courses = courses;
      this.selectedCourse = { ...this.courses[0] };
      this.title = this.selectedCourse.title;
    });
  }

  selectCourse(course: Course | null) {
    this.selectedCourse = { ...course } as Course;
    this.title = this.selectedCourse.title;
  }
  deleteCourse(ev: Event, id: Course['id']) {
    ev.stopImmediatePropagation();
    this.courses = this.courses.filter((course) => course.id !== id);
    this.selectedCourse =
      this.selectedCourse?.id === id ? null : this.selectedCourse;
  }

  saveCourse() {
    console.log(this.selectedCourse);
  }

  resetCourse() {
    this.selectCourse({ ...initialCourse });
  }
}
