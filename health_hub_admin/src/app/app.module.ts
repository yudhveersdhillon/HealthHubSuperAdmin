import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientComponent } from './components/patient/patient.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorFormComponent } from './components/doctors/doctor-form/doctor-form.component';
import { HospitalFormComponent } from './components/hospital/hospital-form/hospital-form.component';
import { StaffComponent } from './components/staff/staff.component';
import { StaffFormComponent } from './components/staff/staff-form/staff-form.component';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule,
  NbSelectModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NbMomentDateModule } from '@nebular/moment';
// import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    HospitalComponent,
    DoctorsComponent,
    PatientComponent,
    LoginComponent,
    DoctorFormComponent,
    HospitalFormComponent,
    StaffComponent,
    StaffFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbInputModule,
    NbCardModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      countDuplicates: true,
      positionClass: 'toast-top-right',
      timeOut: 2000,
    }),
    NgxPaginationModule,
    NgxSpinnerModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
    NbMomentDateModule,
    // NgSelectModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    NbMenuService,
    NbSidebarService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
