import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientComponent } from './components/patient/patient.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

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
        // canActivate: [AuthGuard],
      },
      { path: 'hospitals', component: HospitalComponent, pathMatch: 'full' },
      { path: 'doctors', component: DoctorsComponent, pathMatch: 'full' },
      { path: 'patients', component: PatientComponent, pathMatch: 'full' },
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
