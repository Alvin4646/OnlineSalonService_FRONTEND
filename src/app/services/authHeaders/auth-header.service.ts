import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderService {

  constructor(private service:LoginService) { }
  public getAuthorizationHeader():HttpHeaders{
    const tokenStr=localStorage.getItem('token')
    const headers = new HttpHeaders().set("Authorization",''+tokenStr);
    return headers;
  }

  checkUserTokenValidity(){
    const token = localStorage.getItem('token');
    if (token != null) {
      if (this.service.tokenExpired(token)) {
        Swal.fire({
          icon:'error',
          text:"Session Expired Please Login again"
        }).then(()=>{window.location.reload()})
        localStorage.clear();
      }
    }
  }
}
