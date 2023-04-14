import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminPayrollComponent } from './admin-payroll/admin-payroll.component';
import { AdminVacationComponent } from './admin-vacation/admin-vacation.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [AdminComponent, AdminPayrollComponent, AdminVacationComponent],
  exports: [AdminComponent, AdminPayrollComponent, AdminVacationComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class AdminModule {}
