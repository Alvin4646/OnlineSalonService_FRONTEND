import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHeaderService } from '../authHeaders/auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,private authHeader:AuthHeaderService) { }
  
  public getAllAppointments(): Observable<any> {
    const headers=this.authHeader.getAuthorizationHeader();
    return this.http.get("http://localhost:8090/appointments", {headers, responseType: "json" });
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
  public completeAppointment(id: any): Observable<any> {
    const headers = this.authHeader.getAuthorizationHeader()
    const body = { title: 'Angular PUT Request Example' };
    return this.http.put("http://localhost:8090/appointment/complete/" + id, body, { headers, responseType: " text" as "json" });
  }
  
  public getAppointmentsByStatus(status:any) {
    return this.http.get("http://localhost:8090/appointments/status/"+status, { responseType: 'json' })
  }
}
