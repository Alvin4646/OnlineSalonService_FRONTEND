import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { AppointmentsService } from 'src/app/services/appointment/appointments.service';
import { Appointment } from 'src/app/models/appointment';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthHeaderService } from 'src/app/services/authHeaders/auth-header.service';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  providers: [LoginComponent]
})
export class BookAppointmentComponent implements OnInit {
  appointment: Appointment = new Appointment;
  customer: Customer = new Customer;
  addMsg: string = "";
  errorMsg: string = "";
  availableTimeSlots: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  isLogin = false;


  constructor(private customerService: CustomerService, private appointmentService: AppointmentsService, private router: Router, public auth:AuthHeaderService) { }
  ngOnInit() {
    this.auth.checkUserTokenValidity();
    this.getCustomerById();
  }

  // getting customer
  getCustomerById() {
    var i = localStorage.getItem('id');
    const id: number = +i!;
    this.customerService.getCustomerById(id).subscribe(
      {
        next: (data: any) => { this.customer = data; console.log(data) },
        error: (err) => { console.log(err) }


      }
    )
  }
  
  // adding appointment to that customer
  addAppointment() {
    var i = localStorage.getItem('id');
    const id: number = +i!;
    console.log(this.appointment);
    this.appointmentService.addAppointment(id, this.appointment).subscribe(
      {
        next: (data) => {
          Swal.fire(
            {
              text:"Appointment Added Successfully",
              icon:"success",
              showConfirmButton:false,
              timer:2000
            })
          this.addMsg = "Appointment added successfully!";
          this.errorMsg = "";
          this.appointment = data
        },
        error: (err) => {
          this.errorMsg = JSON.stringify(err.error);
          this.addMsg = "";
          console.log(err)
        }
      }
    )
  }
}
