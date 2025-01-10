import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ApiUrl } from '../../../services/apiUrls';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrl: './staff-form.component.css',
})
export class StaffFormComponent implements OnInit {
  editForm: any;
  staffForm: any = {};
  role: any = localStorage.getItem('role');
  id: any;
  selectStatus: any;
  imageSrc: string | undefined;
  profileImg: any;
  image: any;
  profileFile: any;
  isShowPaswordField: any = true;
  storeData: any;
  showPassword = true;
  hospitaldata: any;
  max: any;
  // location:any = {type:'Point'}
  data = [
    { name: 'Active', status: 1 },
    { name: 'Inactive', status: 0 },
  ];
  roledata = [
    { name: 'Staff', role: 'staff' },
    { name: 'Nurse', role: 'nurse' },
    { name: 'Receptionist', role: 'receptionist' },
  ];

  constructor(
    private route: Router,
    public service: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private page: Location,
    private router: ActivatedRoute,
    private dateService: NbDateService<Date>
  ) {
    this.router.params.subscribe((route) => {
      this.id = route['id'];
    });
    this.max = this.dateService.today();
  }

  ngOnInit() {
    this.getHospitallist();
    this.staffForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      countryCode: new FormControl('+91', Validators.required),
      phone: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      status: new FormControl(1, Validators.required),
      specialty: new FormControl('', Validators.required),
      hospitalId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      profileImage: new FormControl(),
    });
    if (this.id) {
      this.getStaffById();
      this.isShowPaswordField = false;
    } else {
      this.isShowPaswordField = true;
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
    this.staffForm.patchValue({
      profileImage: '',
    });
  }

  get buttonTitle() {
    return this.id ? 'Edit Staff' : 'Add Staff';
  }
  getHospitallist() {
    // this.isShowPaswordField = false;
    this.service
      .getRequest(`${ApiUrl.hospitalDropdown}`)
      .subscribe((res: any) => {
        this.hospitaldata = res.response.data;
        console.log(this.hospitaldata, 'data');
      });
  }

  getStaffById() {
    this.service
      .getRequest(`${ApiUrl.getStaffById}${this.id}`)
      .subscribe((res: any) => {
        if (res.response.success == true) {
          if (
            res.response?.data?.profileImage == null ||
            res.response?.data?.profileImage == 'undefined'
          ) {
            this.profileImg = res.response?.data?.profileImage;
            console.log(this.profileImg, 'image');
          } else {
            this.profileImg = `${environment.imgUrl}${res.response.data.profileImage}`;
          }

          this.staffForm.patchValue({
            name: res.response.data?.name,
            email: res.response.data?.email,
            password: res.response.data?.password,
            phone: res.response.data?.phone,
            birthdate: res.response.data?.birthdate,
            age: res.response.data?.age,
            hospitalId: res.response.data?.hospitalId,
            department: res.response.data?.department,
            address: res.response.data?.address,
            status: res.response.data?.status,
            role: res.response.data?.role,
          });
        }
      });
  }

  onSubmit() {
    if (this.id) {
      const formData = new FormData();

      if (this.profileFile) {
        formData.append('profileImage', this.profileFile);
      }
      formData.append('name', this.staffForm.get('name').value);
      formData.append('email', this.staffForm.get('email').value);
      formData.append('password', this.staffForm.get('password').value);
      formData.append('phone', this.staffForm.get('phone').value);
      formData.append('status', this.staffForm.get('status').value);
      formData.append('birthdate', this.staffForm.get('birthdate').value);
      formData.append('age', this.staffForm.get('age').value);
      formData.append('hospitalId', this.staffForm.get('hospitalId').value);
      formData.append('department', this.staffForm.get('department').value);
      formData.append('address', this.staffForm.get('address').value);
      formData.append('role', this.staffForm.get('role').value);

      this.service
        .putRequest(`${ApiUrl.editStaff}${this.id}`, formData)
        .subscribe((res: any) => {
          this.toastr.success(res.response.message);
          this.route.navigate(['/staff']);
        });
    } else {
      this.spinner.show();
      var formData = new FormData();
      formData.append('name', this.staffForm.get('name').value);
      formData.append('email', this.staffForm.get('email').value);
      formData.append('password', this.staffForm.get('password').value);
      formData.append('phone', this.staffForm.get('phone').value);
      formData.append('status', this.staffForm.get('status').value);
      formData.append('birthdate', this.staffForm.get('birthdate').value);
      formData.append('age', this.staffForm.get('age').value);
      formData.append('hospitalId', this.staffForm.get('hospitalId').value);
      formData.append('department', this.staffForm.get('department').value);
      formData.append('address', this.staffForm.get('address').value);
      formData.append('profileImage', this.profileFile);

      this.service.postRequest(ApiUrl.addStaff, formData).subscribe(
        (res: any) => {
          // console.log(res, "res")
          this.toastr.success(res.response.message);
          this.route.navigate(['/staff']);
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
    // console.log(this.staffForm)
  }

  onPhoneInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 20);
    this.staffForm.get('phone')?.setValue(input.value);
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
  calculateAge(dateOfBirth: Date) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    this.staffForm.get('age').setValue(age);
    this.staffForm.patchValue({
      birthdate: birthDate,
    });
  }
}
