export class ApiUrl {
  public static login: string = '/superAdmin/login';

  public static addDoctor: string = '/superAdmin/hospital/doctor/register';
  public static doctorList: string = '/superAdmin/hospital/alldoctor/list';
  public static getDoctorById: string = '/superAdmin/hospital/doctor/list/';
  public static editDoctor: string = '/superAdmin/hospital/doctor/update/';
  public static deleteDoctor: string = '/superAdmin/hospital/doctor/delete/';
  public static hospitalDropdown: string = '/superAdmin/hospital/all/list/';

  public static addHospital: string = '/superAdmin/hospital/register';
  public static hospitalList: string = '/superAdmin/admin/list';
  public static hospitalById: string = '/superAdmin/hospital/list/';
  public static editHospital: string = '/superAdmin/hospital/update/';
  public static deleteHospital: string = '/superAdmin/hospital/delete/';
}
