import { Component, OnInit } from '@angular/core';
import { ApiUrl } from '../../services/apiUrls';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscribed-hospital',
  templateUrl: './subscribed-hospital.component.html',
  styleUrl: './subscribed-hospital.component.css',
})
export class SubscribedHospitalComponent implements OnInit {
  id: any;
  staff: any;
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
    this.getStaffList();
    this.getHospitaldropdown();
  }
  getStaffList() {
    this.spinner.show();
    this.service.getRequest(ApiUrl.staffList + `?word=${this.word}`).subscribe(
      (res: any) => {
        this.staff = res.response.data.staffList;
        this.total = res.response.data.staffCount;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  addStaff() {
    this.route.navigate(['/addstaff']);
  }

  editStaff(id: any) {
    this.route.navigate(['/editstaff/' + id]);
  }

  onFilterKeySearch() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getStaffList();
    }, 1000);
  }
  pageChanged(event: any) {
    this.page = event;
    this.getStaffList();
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
        this.service.deleteRequest(`${ApiUrl.deleteStaff}${id}`).subscribe(
          (res: any) => {
            // console.log(res, "delete")
            this.toastr.success(res.response.message);
            this.getStaffList();
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
    this.getStaffList();
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
