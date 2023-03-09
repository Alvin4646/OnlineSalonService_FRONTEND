import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public getAllAppointments(): Observable<any> {
   
    return this.http.get("http://localhost:8090/appointments", { responseType: "json" });
  }
  public getAllCustomers() {
    const tokenStr=localStorage.getItem('token')
    const headers = new HttpHeaders().set("Authorization",''+tokenStr);
    return this.http.get("http://localhost:8090/customer", {headers, responseType: 'json' });
  }
  public getAllServices() {
    return this.http.get("http://localhost:8090/services", { responseType: 'json' })
  }
  public getAllPayments() {
    return this.http.get("http://localhost:8090/payments", { responseType: 'json' })
  }
}
