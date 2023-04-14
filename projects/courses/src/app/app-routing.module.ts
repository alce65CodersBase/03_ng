import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminPayrollComponent } from './admin/admin-payroll/admin-payroll.component';
import { AdminVacationComponent } from './admin/admin-vacation/admin-vacation.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'courses2',
    loadChildren: () =>
      import('./courses2/courses2.module').then((m) => m.Courses2Module),
  },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'payroll', component: AdminPayrollComponent },
      { path: 'vacation', component: AdminVacationComponent },
    ],
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
