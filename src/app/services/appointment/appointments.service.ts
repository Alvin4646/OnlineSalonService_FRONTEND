import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Payment } from 'src/app/models/payment';
import { AuthHeaderService } from '../authHeaders/auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient,private authHeader:AuthHeaderService) {}

  public getAllAppointments(): Observable<any> {
    
    const headers = this.authHeader.getAuthorizationHeader()
    return this.http.get("http://localhost:8090/appointments", {headers, responseType: "json" });
  }
  public cancelAppointment(id: any): Observable<any> {
    const headers = this.authHeader.getAuthorizationHeader()
    const body = { title: 'Angular PUT Request Example' };
    return this.http.put("http://localhost:8090/appointment/cancel/" + id, body, { headers, responseType: " text" as "json" });
  }
  public addAppointment(id: any,appointment:Appointment): Observable<any>{
    const headers = this.authHeader.getAuthorizationHeader()
    return this.http.post("http://localhost:8090/appointment/"+id,appointment,{headers,responseType: "json"});
  }
  public bookAppointment(cid:number,aid:number,payment:Payment){
    const headers = this.authHeader.getAuthorizationHeader()
    return this.http.post("http://localhost:8090/appointment/"+cid+"/"+aid,payment,{headers,responseType: "json"});
  }
  public updateAppointment(id: number,appointment:Appointment): Observable<any> {
    const headers = this.authHeader.getAuthorizationHeader()
    return this.http.put("http://localhost:8090/appointment/" + id, appointment, {headers,  responseType: "json" });
  }
  public getAppointmentById(id: number): Observable<any> {
    const headers = this.authHeader.getAuthorizationHeader()
    return this.http.get("http://localhost:8090/appointment/" + id, {headers,  responseType: "json" });
  }
}
