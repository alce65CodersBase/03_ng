import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Courses2RoutingModule } from './courses2-routing.module';
import { CoursesComponent } from './courses.component';
import { MaterialModule } from '../material.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CoursesDetailsComponent,
  ],
  imports: [CommonModule, FormsModule, Courses2RoutingModule, MaterialModule],
})
export class Courses2Module {}
