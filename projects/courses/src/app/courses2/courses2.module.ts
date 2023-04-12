import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Courses2RoutingModule } from './courses2-routing.module';
import { CoursesComponent } from './courses.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, FormsModule, Courses2RoutingModule, MaterialModule],
})
export class Courses2Module {}
