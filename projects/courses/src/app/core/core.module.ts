import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FileInputComponent } from './file-input/file-input.component';

@NgModule({
  declarations: [MenuComponent, FileInputComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [MenuComponent, FileInputComponent],
})
export class CoreModule {}
