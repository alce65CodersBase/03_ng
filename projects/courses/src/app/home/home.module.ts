import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@NgModule({
  declarations: [HomeComponent, RegisterComponent, LessonDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    HomeRoutingModule,
    CoreModule,
  ],
})
export class HomeModule {}
