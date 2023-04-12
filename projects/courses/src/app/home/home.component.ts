import { Component } from '@angular/core';
import { Lesson } from '../../models/lessons';
import { CoursesRepoService } from '../services/courses.repo.service';

@Component({
  selector: 'sdi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  constructor(private repoSrv: CoursesRepoService) {
    this.lessons = [];
    this.repoSrv
      .getLessonsMock()
      .subscribe((lessons) => (this.lessons = lessons));
    this.selectedLesson = this.lessons[0];
  }

  selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson;
  }
}
