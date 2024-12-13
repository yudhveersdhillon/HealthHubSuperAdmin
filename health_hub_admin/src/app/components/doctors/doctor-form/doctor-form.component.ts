import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ApiUrl } from '../../../services/apiUrls';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
// import { MatDialog } from '@angular/material/dialog';
// import { AdminChangepasswordComponent } from '../admin-changepassword/admin-changepassword.component';
@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css',
})
export class DoctorFormComponent {
  editForm: any;
  storeForm: any = {};
  role: any = localStorage.getItem('role');
  id: any;
  selectStatus: any;
  imageSrc: string | undefined;
  profileImg: any;
  image: any;
  profileFile: any;
  isShowPaswordField: boolean = true;
  storeData: any;
  showPassword = true;
  // location:any = {type:'Point'}
  data = [
    { name: 'Active', status: 1 },
    { name: 'Inactive', status: 0 },
  ];
  roledata = [
    { name: 'Admin', role: 'admin' },
    { name: 'Manager', role: 'manager' },
  ];

  constructor(
    private route: Router,
    public service: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private page: Location,
    private router: ActivatedRoute // private dialog: MatDialog,
  ) {
    this.router.params.subscribe((route) => {
      this.id = route['id'];
    });
  }

  ngOnInit() {
    this.storeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      status: new FormControl(1, Validators.required),
      specialty: new FormControl('', Validators.required),
      licenseNumber: new FormControl('', Validators.required),
      yearsOfExperience: new FormControl('', Validators.required),
      hospital: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      profileImage: new FormControl(),
    });
    if (this.id) {
      this.getDoctorById();
    }
  }

  imgFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageSrc = URL.createObjectURL(event.target.files[0]);
    }
  }

  updateImage(event: any, name: any) {
    let files = event.target.files[0];
    // console.log(files, "file")
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImg = e.target.result;
      this.profileFile = files;
    };
    reader.readAsDataURL(files);
  }

  removeImage(name: any) {
    this.profileImg = '';
    this.storeForm.patchValue({
      profileImage: '',
    });
  }

  get buttonTitle() {
    return this.id ? 'Edit Doctor' : 'Add Doctor';
  }

  getDoctorById() {
    this.isShowPaswordField = false;
    this.service
      .getRequest(`${ApiUrl.getDoctorById}${this.id}`)
      .subscribe((res: any) => {
        if (res.response.success == true) {
          this.isShowPaswordField = false;
          if (
            res.response?.data?.profileImage == null ||
            res.response?.data?.profileImage == 'undefined'
          ) {
            this.profileImg = res.response?.data?.profileImage;
            console.log(this.profileImg, 'image');
          } else {
            this.profileImg = `${environment.imgUrl}${res.response.data.profileImage}`;
          }

          this.storeForm.patchValue({
            name: res.response.data?.name,
            email: res.response.data?.email,
            password: res.response.data?.password,
            phone: res.response.data?.phone,
            status: res.response.data?.status,
            role: res.response.data?.role,
          });
        }
      });
  }

  onSubmit() {
    if (this.id) {
      const formData = new FormData();
      if (this.storeForm.value.storeId) {
        this.storeForm.value.storeId.map((m: any) => {
          formData.append('storeId', m);
        });
      }
      if (this.profileFile) {
        formData.append('profileImage', this.profileFile);
      }
      formData.append('name', this.storeForm.get('name').value);
      formData.append('email', this.storeForm.get('email').value);
      formData.append('password', this.storeForm.get('password').value);
      formData.append('phone', this.storeForm.get('phone').value);
      formData.append('status', this.storeForm.get('status').value);
      formData.append('role', this.storeForm.get('role').value);
      // formData.append('profileImage', this.profileFile);

      this.service
        .putRequest(`${ApiUrl.editDoctor}${this.id}`, formData)
        .subscribe((res: any) => {
          this.toastr.success(res.response.message);
          this.route.navigate(['/adminlist']);
        });
    } else {
      this.spinner.show();
      var formData = new FormData();
      formData.append('name', this.storeForm.get('name').value);
      formData.append('email', this.storeForm.get('email').value);
      formData.append('password', this.storeForm.get('password').value);
      formData.append('phone', this.storeForm.get('phone').value);
      formData.append('status', this.storeForm.get('status').value);
      formData.append('profileImage', this.profileFile);

      this.service.postRequest(ApiUrl.addDoctor, formData).subscribe(
        (res: any) => {
          // console.log(res, "res")
          this.toastr.success(res.response.message);
          this.route.navigate(['/doctors']);
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
    // console.log(this.storeForm)
  }

  onPhoneInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 20);
    this.storeForm.get('phone')?.setValue(input.value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // openChangePassword() {
  //   this.dialog.open(AdminChangepasswordComponent, {
  //     width: '50%',
  //     data: { id: this.id }
  //   })
  // }

  onBack() {
    this.page.back();
  }
}
