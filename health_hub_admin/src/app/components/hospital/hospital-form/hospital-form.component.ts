import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ApiUrl } from '../../../services/apiUrls';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrl: './hospital-form.component.css',
})
export class HospitalFormComponent {
  editForm: any;
  hospitalForm: any = {};
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
  select = [
    { name: 'True', value: true },
    { name: 'False', value: false },
  ];
  departments = [
    { name: 'General Medicine' },
    { name: 'Emergency Medicine' },
    { name: 'General Surgery' },
    { name: 'Orthopedics ' },
    { name: 'Obstetrics and Gynecology' },
    { name: 'Pediatrics' },
    { name: 'Cardiology' },
    { name: 'Neurology' },
    { name: 'Urology' },
    { name: 'Nephrology' },
    { name: 'Oncology' },
    { name: 'Gastroenterology' },
    { name: 'Pulmonology' },
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
    this.hospitalForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      website: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      totalBeds: new FormControl('', Validators.required),
      departments: new FormControl([], Validators.required),
      ipd: new FormControl('', Validators.required),
      pharmacy: new FormControl('', Validators.required),
      lab: new FormControl('', Validators.required),
      // subscription: new FormControl('', Validators.required),
      status: new FormControl(1, Validators.required),
      profileImage: new FormControl(),
    });
    if (this.id) {
      this.getHospitalById();
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
    this.hospitalForm.patchValue({
      profileImage: '',
    });
  }

  get buttonTitle() {
    return this.id ? 'Edit Hospital' : 'Add Hospital';
  }

  getHospitalById() {
    this.isShowPaswordField = false;
    this.service
      .getRequest(`${ApiUrl.hospitalById}${this.id}`)
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

          this.hospitalForm.patchValue({
            name: res.response.data?.name,
            email: res.response.data?.email,
            contactNumber: res.response.data?.contactNumber,
            address: res.response.data?.address,
            website: res.response.data?.website,
            totalBeds: res.response.data?.totalBeds,
            departments: res.response.data?.departments,
            ipd: res.response.data?.ipd,
            pharmacy: res.response.data?.pharmacy,
            lab: res.response.data?.lab,
            status: res.response.data?.status,
            role: res.response.data?.role,
          });
        }
      });
  }

  onSubmit() {
    if (this.id) {
      const formData = new FormData();
      if (this.hospitalForm.value.storeId) {
        this.hospitalForm.value.storeId.map((m: any) => {
          formData.append('storeId', m);
        });
      }
      if (this.profileFile) {
        formData.append('profileImage', this.profileFile);
      }
      formData.append('name', this.hospitalForm.get('name').value);
      formData.append('address', this.hospitalForm.get('address').value);
      formData.append(
        'contactNumber',
        this.hospitalForm.get('contactNumber').value
      );
      formData.append('email', this.hospitalForm.get('email').value);
      formData.append('website', this.hospitalForm.get('website').value);
      formData.append('password', this.hospitalForm.get('password').value);
      formData.append('totalBeds', this.hospitalForm.get('totalBeds').value);
      formData.append(
        'departments',
        this.hospitalForm.get('departments').value
      );
      formData.append('ipd', this.hospitalForm.get('ipd').value);
      formData.append('pharmacy', this.hospitalForm.get('pharmacy').value);
      formData.append('lab', this.hospitalForm.get('lab').value);
      // formData.append('status', this.hospitalForm.get('status').value);
      // formData.append('role', this.hospitalForm.get('role').value);
      formData.append('profileImage', this.profileFile);

      this.service
        .putRequest(`${ApiUrl.editHospital}${this.id}`, formData)
        .subscribe((res: any) => {
          this.toastr.success(res.response.message);
          this.route.navigate(['/hospitals']);
        });
    } else {
      this.spinner.show();
      var formData = new FormData();
      formData.append('name', this.hospitalForm.get('name').value);
      formData.append('address', this.hospitalForm.get('address').value);
      formData.append(
        'contactNumber',
        this.hospitalForm.get('contactNumber').value
      );
      formData.append('email', this.hospitalForm.get('email').value);
      formData.append('website', this.hospitalForm.get('website').value);
      formData.append('password', this.hospitalForm.get('password').value);
      formData.append('totalBeds', this.hospitalForm.get('totalBeds').value);
      formData.append(
        'departments',
        this.hospitalForm.get('departments').value
      );
      formData.append('ipd', this.hospitalForm.get('ipd').value);
      formData.append('pharmacy', this.hospitalForm.get('pharmacy').value);
      formData.append('lab', this.hospitalForm.get('lab').value);
      formData.append('profileImage', this.profileFile);

      this.service.postRequest(ApiUrl.addHospital, formData).subscribe(
        (res: any) => {
          // console.log(res, "res")
          this.toastr.success(res.response.message);
          this.route.navigate(['/hospitals']);
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  }

  onPhoneInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 20);
    this.hospitalForm.get('phone')?.setValue(input.value);
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
