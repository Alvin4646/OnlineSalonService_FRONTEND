import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './components/appointment/appointment.component'; 
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';

import { AdminAppointmentsComponent } from './components/admin/admin-appointments/admin-appointments.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchPipe } from './pipes/search.pipe';
import { AdminPaymentComponent } from './components/admin/admin-payment/admin-payment.component';
import { UpdateAppointmentComponent } from './components/update-appointment/update-appointment.component';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';
import{MatDialogModule} from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { SalonServiceComponent } from './components/salon-service/salon-service.component';
import { AddSalonServiceComponent } from './components/admin/add-salon-service/add-salon-service.component';
import { UpdateSalonServiceComponent } from './components/admin/update-salon-service/update-salon-service.component';
import { OrderByPipePipe } from './pipes/order-by-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    HomePageComponent,
    NavBarComponent,
    PageNotFoundComponent,
    LoginComponent,
    BookAppointmentComponent,
    PaymentComponent,
    AdminHomeComponent,
    UpdateCustomerComponent,
    
    AdminAppointmentsComponent,
    AdminCustomersComponent,
    CartComponent,
    SearchPipe,
    AdminPaymentComponent,
    UpdateAppointmentComponent,
    PaymentDialogComponent,
    AdminRegisterComponent,
    SalonServiceComponent,
    AddSalonServiceComponent,
    UpdateSalonServiceComponent,
    OrderByPipePipe,

  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
