import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { service } from 'src/app/models/service';
import { LoginService } from 'src/app/services/login/login.service';
import { SalonServiceService } from 'src/app/services/salonService/salon-service.service';
import Swal from 'sweetalert2';
import { AddSalonServiceComponent } from '../admin/add-salon-service/add-salon-service.component';
import { UpdateSalonServiceComponent } from '../admin/update-salon-service/update-salon-service.component';

@Component({
  selector: 'app-salon-service',
  templateUrl: './salon-service.component.html',
  styleUrls: ['./salon-service.component.css']
})
export class SalonServiceComponent implements OnInit {
  query: string = "";
  services: service[] = [];
  msg: String = "";
  errorMsg: String = "";

  constructor(private salonServices: SalonServiceService, public security: LoginService, private dialog: MatDialog) { }
  
  ngOnInit() {
    this.salonServices.getAllServices()
      .subscribe(
        {
          next: (data) => {
            console.log(data);
            this.services = data;
            this.msg = "Fetched all services, Success!";
            this.errorMsg = "";
          },
          error: (error) => {
            console.log(error);
            this.errorMsg = "Could not fetch all services, please try after some time.";
            this.msg = "";
          }
        });
  }

  addToCart(service: any): void {
    var i = localStorage.getItem('id');
    const id: number = +i!;
    
      this.salonServices.addServiceById(service, id)
        .subscribe(
          {
            next: (data) => {
              Swal.fire(
                {
                  text:"Service Added to Cart",
                  icon:"success"
                }).then(()=>{window.location.reload()})
              this.msg = "Added service to cart";
              this.errorMsg = "";
            },
            error: (error) => {
              this.errorMsg = "Could not add to cart";
              this.msg = "";
            }
          }
        );
  }

  addService() {
    this.dialog.open(AddSalonServiceComponent, {
      height: '400px',
      width: '45%',
    }).afterClosed().subscribe(() => window.location.reload())
  }

  updateService(id: number) {
    this.dialog.open(UpdateSalonServiceComponent, {
      data: id,
      height: '400px',
      width: '45%',
    }).afterClosed().subscribe(() => window.location.reload())
  }
}
