import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'projects/courses/src/models/courses';

@Component({
  selector: 'sdi-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  @Input() courses: Course[];
  @Output() selected: EventEmitter<Course>;
  @Output() deleted: EventEmitter<Course['id']>;

  constructor() {
    this.courses = [];
    this.selected = new EventEmitter();
    this.deleted = new EventEmitter();
  }

  selectCourse(course: Course) {
    this.selected.next(course);
  }
  deleteCourse(ev: Event, id: Course['id']) {
    ev.stopImmediatePropagation();
    this.deleted.next(id);
  }
}
