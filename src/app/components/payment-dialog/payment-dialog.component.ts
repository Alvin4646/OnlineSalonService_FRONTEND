import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Payment } from 'src/app/models/payment';
import { AuthHeaderService } from 'src/app/services/authHeaders/auth-header.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {
  payment: Payment = new Payment;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: PaymentService,private auth:AuthHeaderService) { }
  ngOnInit() {
    this.auth.checkUserTokenValidity()
    this.getPayment();
  }

  // reactive form
  paymentForm = new FormGroup({
    type: new FormControl(''),
    status: new FormControl(''),
    amount: new FormControl('')
  })

  getPayment() {
    this.service.getPaymentById(this.data.aid).subscribe({
      next: (pay) => { this.payment = pay; console.log(pay) }
    })
  }
  
}
