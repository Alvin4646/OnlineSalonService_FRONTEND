import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { service } from 'src/app/models/service';

@Injectable({
  providedIn: 'root'
})
export class SalonServiceService {

  constructor(private httpClient: HttpClient) { }
  getAllServices(): Observable<any> {
    return this.httpClient.get("http://localhost:8090/services", { responseType: "json" });
  }
  cartServices(): Observable<any> {
    return this.httpClient.get("http://localhost:8090/servicecart/getCart/1", { responseType: "json" });
  }
  postNewService(service: service): Observable<any> {
    return this.httpClient.post("http://localhost:8090/adminAddService", service, { responseType: 'text' });
  }
  updateService(service: service): Observable<any> {
    return this.httpClient.put("http://localhost:8090/adminUpdateService/" + service.serviceId, service, { responseType: 'text' });
  }
  deleteServiceById(serviceid: Number): Observable<any> {
    return this.httpClient.delete("http://localhost:8090/adminDeleteService/" + serviceid, { responseType: 'text' });
  }
  addServiceById(service: service, id: number): Observable<any> {
    return this.httpClient.post("http://localhost:8090/cart/add?id=" + id, service, { responseType: "json" });
  }
  getServiceById(id: number) {
    return this.httpClient.get("http://localhost:8090/" + id, { responseType: "json" });
  }
}
