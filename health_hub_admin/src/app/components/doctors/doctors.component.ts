import { Component, OnInit } from '@angular/core';
import { ApiUrl } from '../../services/apiUrls';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  id: any;
  doctors: any;
  profileImg: any;
  profileFile: any;
  imagePath: string = environment.imgUrl;
  // profileimage:any
  companyName: any;
  page: any = 1;
  total: any = 0;
  pageSize = 10;
  selectedPage: any;
  word: any = '';
  count: number = 5;
  timeout: any = null;

  constructor(
    private service: ApiService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAdminList();
  }
  getAdminList() {
    this.spinner.show();
    this.service
      .getRequest(ApiUrl.doctorList + `?page=${this.page}&word=${this.word}`)
      .subscribe(
        (res: any) => {
          this.doctors = res.response.data.adminList;
          this.total = res.response.data.adminCount;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  addAdmin() {
    this.route.navigate(['/adminregister']);
  }

  editAdmin(id: any) {
    this.route.navigate(['/adminedit/' + id]);
  }

  confirmDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.deleteAdmin(this.id);
      }
    });
  }

  onFilterKeySearch() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getAdminList();
    }, 1000);
  }
  pageChanged(event: any) {
    this.page = event;
    this.getAdminList();
  }

  deleteAdmin(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.service.deleteRequest(`${ApiUrl.deleteDoctor}${id}`).subscribe(
          (res: any) => {
            // console.log(res, "delete")
            this.toastr.success(res.response.message);
            this.getAdminList();
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }
}
