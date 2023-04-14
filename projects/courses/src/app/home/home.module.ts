import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@NgModule({
  declarations: [HomeComponent, LessonDetailComponent],
  imports: [CommonModule, MaterialModule, HomeRoutingModule],
})
export class HomeModule {}
