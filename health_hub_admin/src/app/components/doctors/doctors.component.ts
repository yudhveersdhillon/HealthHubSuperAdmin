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
  hospitaldata: any;
  selectedHospitalId: any = '';

  constructor(
    private service: ApiService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getDoctorList();
    this.getHospitaldropdown();
  }
  getDoctorList() {
    this.spinner.show();
    this.service
      .getRequest(
        ApiUrl.doctorList +
          `?page=${this.page}&word=${this.word}&hospitalId=${this.selectedHospitalId}`
      )
      .subscribe(
        (res: any) => {
          this.doctors = res.response.data.doctorList;
          this.total = res.response.data.doctorCount;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  addAdmin() {
    this.route.navigate(['/adddoctor']);
  }

  editAdmin(id: any) {
    this.route.navigate(['/editdoctor/' + id]);
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
      this.getDoctorList();
    }, 1000);
  }
  pageChanged(event: any) {
    this.page = event;
    this.getDoctorList();
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
            this.getDoctorList();
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }
  onHospitalSelection() {
    // console.log(this.storeId, "Selected storeId");
    this.getDoctorList();
  }

  getHospitaldropdown() {
    this.service
      .getRequest(`${ApiUrl.hospitalDropdown}`)
      .subscribe((res: any) => {
        this.hospitaldata = res.response.data;
        // console.log(this.hospitaldata, 'data');
      });
  }
}
