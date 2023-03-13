import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminAppointmentsComponent } from './components/admin/admin-appointments/admin-appointments.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminPaymentComponent } from './components/admin/admin-payment/admin-payment.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { CartComponent } from './components/cart/cart.component';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SalonServiceComponent } from './components/salon-service/salon-service.component';
import { UpdateAppointmentComponent } from './components/update-appointment/update-appointment.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'home',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'appointment',component:AppointmentComponent,canActivate:[AuthGuard]},
  {path:'bookAppointment',component:BookAppointmentComponent,canActivate:[AuthGuard]},
  {path:'updateAppointment',component:UpdateAppointmentComponent,canActivate:[AuthGuard]},
  {path:'salonService',component:SalonServiceComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'payment/:id',component:PaymentComponent,canActivate:[AuthGuard]},
  {path:'updateCustomer',component:UpdateCustomerComponent,canActivate:[AuthGuard]},
  {path:'adminHome',component:AdminHomeComponent, canActivate:[AuthGuard,AdminGuard]},
  {path:'admin/appointments',component:AdminAppointmentsComponent, canActivate:[AuthGuard,AdminGuard]},
  {path:'admin/customers',component:AdminCustomersComponent, canActivate:[AuthGuard,AdminGuard]},
  {path:'admin/payments',component:AdminPaymentComponent, canActivate:[AuthGuard,AdminGuard]},
  {path:'admin/register',component:AdminRegisterComponent, canActivate:[AuthGuard,AdminGuard]},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
