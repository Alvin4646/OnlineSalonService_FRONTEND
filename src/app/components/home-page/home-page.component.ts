import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private service:LoginService){}
  ngOnInit(){
    const token = localStorage.getItem('token');
    if (token != null) {
      if (this.service.tokenExpired(token)) {
        Swal.fire({
          icon:'error',
          text:"Session Expired Please Login again"
        })
        localStorage.clear();
      }
    }
  }

}
