import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sdi-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss'],
})
export class LessonDetailComponent {
  currentId!: string | null;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(
      (params) => (this.currentId = params.get('id'))
    );
  }
}
