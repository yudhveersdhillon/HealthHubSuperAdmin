import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiUrl } from '../../services/apiUrls';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: any = {};
  submitButton: boolean = false;
  loginError: boolean = false;
  constructor(
    private service: ApiService,
    private router: Router,
    public toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) this.router.navigate(['/dashboard']);
    }
  }

  onLoginSubmit(fm: any) {
    this.submitButton = true;
    // console.log('form', this.form);
    if (this.form.email && this.form.password) {
      this.service.postRequest(ApiUrl.login, this.form).subscribe(
        (data: any) => {
          this.toastr.success('Login Successfully');
          localStorage.setItem('token', data.response.data.token);
          this.router.navigate(['/dashboard']);
        },
        (err: any) => {
          this.loginError = true;
          this.submitButton = false;
          // console.log('err', err);
        }
      );
    }

    //   this.service.postRequest(ApiUrl.login, this.form).subscribe(
    //     (data: any) => {
    //       localStorage.setItem('token', data.token);
    //       this.router.navigate(['/home']);
    //     },
    //     (err: any) => {
    //     }
    //   );
  }
}
