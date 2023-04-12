import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, FormsModule, CoursesRoutingModule, MaterialModule],
})
export class CoursesModule {}
