import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderService {

  constructor() { }
  public getAuthorizationHeader():HttpHeaders{
    const tokenStr=localStorage.getItem('token')
    const headers = new HttpHeaders().set("Authorization",''+tokenStr);
    return headers;
  }
}
