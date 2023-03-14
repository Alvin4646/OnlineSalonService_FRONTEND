import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this._isLoggedIn.asObservable();
  user: Login = new Login();
  customer: Customer = new Customer();
  msg: String = "";
  errorMsg: String = "";
  customerRegister: FormGroup;

  constructor(private service: LoginService, private router: Router, private custService: CustomerService, private formBuilder: FormBuilder) {
    this.customerRegister = this.formBuilder.group({
      userName: new FormControl("", [Validators.required, Validators.pattern('[a-zA-z0-9]*')]),
      password: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z0-9@#!%^&*]{8,16}$')]),
      confirmPassword: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]{3,}$')]),
      email: new FormControl("", [Validators.required, Validators.email]),
      contactNo: new FormControl("", [Validators.required, Validators.minLength(10),Validators.pattern('^[6-9]{1}?[0-9]{2,9}$')]),
      dob: new FormControl("", [Validators.required, this.birthdateValidator()]),
      address: new FormControl("", [Validators.required, Validators.min(3), Validators.pattern('[a-zA-Z0-9,-\s ]{5,}$')]),
    }, { validators: this.checkPasswords.bind(this) })

    //check login
    const token = localStorage.getItem('token');
    this._isLoggedIn.next(!!token);
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token != null) {
      if (this.service.tokenExpired(token)) {
        localStorage.clear();
      }
    }
  }

  // validator to check if passwords are same
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  // validator for dob
  birthdateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const inputDate = new Date(control.value);
      if (inputDate >= currentDate) {
        return { 'futureDate': true };
      }
      return null;
    };
  }

  // getter for form fields
  getControl(name: any): AbstractControl | null {
    return this.customerRegister.get(name)
  }

  public isAdmin() {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    } else {
      return false;
    }
  }
  
  // login function
  public getAccessToken(authRequest: any) {
    let req = this.service.generateToken(authRequest);
    req.subscribe({
      next: (data: any) => {
        this.msg = "You have Successfully logged in. .";
        localStorage.setItem('token',data.headers.get("token") )
        let str = JSON.parse(data.body);
        this.errorMsg = "";
        localStorage.setItem('id', str["userId"])
        localStorage.setItem('role', str["role"])
        localStorage.setItem('username', str["userName"])
        this.goToHome();
      },
      error: (error) => {
        this.errorMsg = error.error
        this.msg = ""
        console.log(error)
      }
    });
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  // on login redirect function
  goToHome() {
    if (this.service.isAdmin()) {
      this.router.navigate(['/adminHome']).then(() => {
        window.location.reload();
      });
    } else {

      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    }
  }

  registerCustomer() {
    this.customer = this.customerRegister.value
    this.customer.role = "customer"
    console.log(this.customer);
    this.custService.addCustomer(this.customer).subscribe(
      {
        next: (data) => {
          this.msg = "User Registered Successfully Now please Login in"
          this.errorMsg = ""
          console.log(data)
        },
        error: (err) => {
          this.errorMsg = JSON.stringify(err.error)
          this.msg = ""
          console.log(err)
        }
      }
    )
  }
}
