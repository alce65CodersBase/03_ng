import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/courses';
import { CoursesApiRepoService } from '../services/courses.api.repo.service';

const initialCourse: Course = {
  id: '',
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

  constructor(private repoSrv: CoursesApiRepoService) {
    this.courses = [];
    this.selectedCourse = initialCourse;
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.repoSrv.loadItems().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.selectedCourse = { ...this.courses[0] };
        this.title = this.selectedCourse.title;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectCourse(course: Course | null) {
    this.selectedCourse = course as Course;
    this.title = this.selectedCourse.title;
  }

  deleteCourse(id: Course['id']) {
    this.repoSrv.deleteItem(id).subscribe({
      next: () => {
        this.courses = this.courses.filter((course) => course.id !== id);
        this.selectedCourse =
          this.selectedCourse?.id === id ? null : this.selectedCourse;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveCourse() {
    if (this.selectedCourse?.id) {
      console.log('Update');
      this.updateCourse();
    } else {
      console.log('Add');
      this.addCourse();
    }
  }

  updateCourse() {
    if (!this.selectedCourse) {
      console.log('NOT possible update');
      return;
    }
    this.repoSrv.updateItem(this.selectedCourse).subscribe({
      next: (course) => {
        this.courses = this.courses.map((item) =>
          item.id === course.id ? course : item
        );
        this.selectedCourse = { ...course };
        this.title = this.selectedCourse.title;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCourse() {
    if (!this.selectedCourse) {
      console.log('NOT possible create');
      return;
    }
    this.repoSrv.createItem(this.selectedCourse).subscribe({
      next: (course) => {
        this.courses = [...this.courses, course];
        this.selectedCourse = { ...(this.courses.at(-1) as Course) };
        this.title = this.selectedCourse.title;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetCourse() {
    this.selectCourse({ ...initialCourse });
  }
}
