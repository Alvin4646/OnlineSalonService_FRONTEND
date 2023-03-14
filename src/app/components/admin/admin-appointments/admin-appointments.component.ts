import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { Customer } from 'src/app/models/customer';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthHeaderService } from 'src/app/services/authHeaders/auth-header.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-appointments',
  templateUrl: './admin-appointments.component.html',
  styleUrls: ['./admin-appointments.component.css']
})
export class AdminAppointmentsComponent implements OnInit{
  appointment:Appointment[]=[];
  customer:Customer[]=[]
  query:string="";
  constructor(private adminService:AdminService,private auth:AuthHeaderService){}
  ngOnInit(){
    this.auth.checkUserTokenValidity()
    this.getAllAppointments();
    this.fetchAllCustomers();
  }
  sortField: string = "id";
  changeSortFiled(filed: string) {
    this.sortField = filed;
  }
  getAllAppointments(){
    this.adminService.getAllAppointments().subscribe({
      next:(data)=>{this.appointment=data },
      error:(err)=>console.log(err)
    })
  }
  fetchAllCustomers(){
    this.adminService.getAllCustomers().subscribe({
      next:(data:any)=>{this.customer=data;console.log(data)},
      error:(err)=>{console.log(err)}
    })
  }
  completeAppointment(aid:number){
    this.adminService.completeAppointment(aid).subscribe({
      next:(data)=>{
        Swal.fire(
          {
            text:"Appointment status changed to complete successfully",
            icon:"success",
            showConfirmButton:false,
            timer:2000
          }).then(()=>{window.location.reload()})
        console.log(data)},
      error:(err)=>{console.log(err)}
    })
  }

}
