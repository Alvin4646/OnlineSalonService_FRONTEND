import { Component,OnInit } from '@angular/core';
import { AuthHeaderService } from 'src/app/services/authHeaders/auth-header.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private auth:AuthHeaderService){}
  ngOnInit(){
   this.auth.checkUserTokenValidity();
  }

}
