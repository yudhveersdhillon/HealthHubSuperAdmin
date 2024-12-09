import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = environment.baseUrl;
  imgUrl: string = environment.imgUrl;

  constructor(private http: HttpClient) {}

  postRequest(url: string, data: any) {
    let token: any = localStorage.getItem('token');
    return this.http.post<any>(this.baseUrl + url, data, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  getRequest(url: string) {
    let token: any = localStorage.getItem('token');
    return this.http.get(this.baseUrl + url, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  putRequest(url: string, data: any) {
    let token: any = localStorage.getItem('token');

    return this.http.put(this.baseUrl + url, data, {
      headers: { authorization: `Bearer ${token}` },
    });
  }
  deleteRequest(url: string) {
    let token: any = localStorage.getItem('token');

    return this.http.delete(this.baseUrl + url, {
      headers: { authorization: `Bearer ${token}` },
    });
  }
}
