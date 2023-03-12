import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Payment } from 'src/app/models/payment';
import { AppointmentsService } from 'src/app/services/appointment/appointments.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  customer: Customer = new Customer;
  payment: Payment = new Payment;

  constructor(private customerService: CustomerService, private appointmentService: AppointmentsService, private router: Router,private activatedRoute:ActivatedRoute) { }
  ngOnInit() {
    this.getCustomerById();
    
  }

  getCustomerById() {
    var i = localStorage.getItem('id');
    const id: number = +i!;
    this.customerService.getCustomerById(id).subscribe(
      {
        next: (data) => { this.customer = data; console.log(data) },
        error: (err) => { console.log(err) }


      }
    )
  }

  // auto payment allocation based on option selected
  paymentType() {
    if (this.payment.type == "CASH") {
      this.payment.status = "PENDING"
    } else if (this.payment.type == "CARD") {
      this.payment.status = "PAID"
    }
  }

  bookMyAppointment() {
    var i = localStorage.getItem('id');
    const cid: number = +i!;
    
    let aid: number=0;
    this.activatedRoute.params.subscribe(param=>
      aid=param['id']
      )
    console.log(this.payment);
    this.appointmentService.bookAppointment(cid, aid, this.payment).subscribe(
      {
        next: (data) => { 
          this.payment = data; console.log(this.payment); 
          Swal.fire( {
            text:"Appointment Booked Successfully",
            icon:"success",
            showConfirmButton:false,
            timer:1000
          }).then(()=>{this.router.navigate(['/appointment'])}) 
           },
        error: (err) => { console.log(err) }
      }
    )
  }
}
