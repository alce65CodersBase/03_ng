import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'projects/courses/src/models/courses';

@Component({
  selector: 'sdi-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent {
  title: string | undefined;
  selectedCourse!: Course | null;

  @Output() saved: EventEmitter<void>;
  @Output() reseated: EventEmitter<void>;
  @Input() set course(value: Course | null) {
    if (!value) return;
    this.selectedCourse = { ...value };
    this.title = value.title;
  }

  constructor() {
    this.title = '';
    this.saved = new EventEmitter();
    this.reseated = new EventEmitter();
  }

  saveCourse() {
    this.saved.next();
  }

  resetCourse() {
    this.reseated.next();
  }
}
