import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [AboutComponent, ListComponent, AddComponent, CardComponent],
  imports: [CommonModule, ReactiveFormsModule, AboutRoutingModule],
})
export class AboutModule {}
