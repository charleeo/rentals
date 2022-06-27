import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from './../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  apiUrl: any;
  password:string
  loading :boolean = false;
  email:string
  title:string="Logininto account"
  loggedIn:boolean=false

  constructor(

    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private titleService: Title,
    private route: ActivatedRoute,
    private router:Router,
    private service:AuthService
    // private sess: SessionService,

  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)
    if(this.service.isAthenticated){
      this.router.navigate(['/'])
    }
    this.initialiseForms();
  }
  
  
  initialiseForms(){
    
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]], 
        
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      rememberMe:[false,[]]
    });
    
  }
  
  onSubmit(formData:any) {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }


    const obj = {
      email: formData.email,
      password: formData.password,
      remember_me:formData.rememberMe
    };

    this.postData(obj);
  }
  
      postData(jsonData: any) {
        this.apiUrl = environment.apiURL + 'users/login';
    
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
        });
    
        this.loading=true
        this.httpClient.post<any>(this.apiUrl, jsonData, { headers: reqHeader }).subscribe(data => {
  
         
          if (data.status === true) {
            this.loading=false
            this.loginForm.reset();

            Object.keys(this.loginForm.controls).forEach(key => {
              this.loginForm.get(key)?.setErrors(null);
            });

            localStorage.setItem(environment.token,data.response.access_token)
            const userObject = JSON.stringify(data.response.user);
            localStorage.setItem(environment.userData, userObject)
            this.loggedIn=true;
            this.service.updateLoggedInStatus(this.loggedIn);//update the authservice to update the header component
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: data.response != null && data.response[0] != undefined ? data.response[0].message : data.message,
              showConfirmButton: true,
              timer: 5000
            });
            
            let redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';

            this.router.navigateByUrl(redirectUrl);

          } else {
            this.loading =false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.response != null && data.response[0] != undefined ? data.response[0].message : data.message,
              showConfirmButton: true,
              timer: 5000
            });
          }
        });
      }
}
