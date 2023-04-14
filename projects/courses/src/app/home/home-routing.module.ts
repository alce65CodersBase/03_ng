import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'lesson/:id', component: LessonDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
