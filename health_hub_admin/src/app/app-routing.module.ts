import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientComponent } from './components/patient/patient.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { DoctorFormComponent } from './components/doctors/doctor-form/doctor-form.component';
import { HospitalFormComponent } from './components/hospital/hospital-form/hospital-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'hospitals',
        component: HospitalComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'addhospital',
        component: HospitalFormComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'edithospital/:id',
        component: HospitalFormComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'adddoctor',
        component: DoctorFormComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'editdoctor/:id',
        component: DoctorFormComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'patients',
        component: PatientComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
