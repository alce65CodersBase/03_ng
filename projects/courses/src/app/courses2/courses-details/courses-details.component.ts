import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'projects/courses/src/models/courses';

@Component({
  selector: 'sdi-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent {
  @Input() selectedCourse!: Course | null;
  @Input() title: string | undefined;
  @Output() saved: EventEmitter<void>;
  @Output() reseated: EventEmitter<void>;

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
