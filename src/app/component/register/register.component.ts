import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  apiUrl: any;
  password:string
  name:string
  email:string
  confirm_password:string
  title:string="Create Account"
  passwordConfirmMessage:string
  passwordConfirmStatus:boolean=false
  loading:boolean=false

  constructor(

    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private titleService: Title,
    private router: Router,
    private service: AuthService
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
    
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45), Validators.pattern(/^[a-zA-Z.+'-]+(?:\s[a-zA-Z.+'-]+)*\s?$/)]],
      password: ['', [Validators.required, Validators.minLength(6), 
        //  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)” + “(?=.*[-+_!@#$%^&*., ?]).+$/)
        ]],
      // phone: ['', [Validators.required, Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      confirm_password: ['', Validators.required],
    });
    
    if(this.registerForm.get('password') !== this.registerForm.get('confirm_password')){
    }
  }
  
  onSubmit(formData:any) {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    if(formData.password !==formData.confirm_password){
      this.passwordConfirmStatus=true
      this.passwordConfirmMessage ="Password and password confirmation must match"
      return
    }
    
    this.passwordConfirmMessage =""


    const obj = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password,
    };

    this.postData(obj);
  }
  
      postData(jsonData: any) {
        this.apiUrl = environment.apiURL + 'users/create';
    
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + localStorage.getItem('admin_access_token')
        });
        this.loading=true
        this.httpClient.post<any>(this.apiUrl, jsonData, { headers: reqHeader }).subscribe(data => {
          
          
          if (data.status === true) {
            this.loading=false
            this.registerForm.reset();
            Object.keys(this.registerForm.controls).forEach(key => {
              this.registerForm.get(key)?.setErrors(null);
            });
            
            // this.spinnerService.hide();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              // text: 'User created successfully',
              text: data.response != null && data.response[0] != undefined ? data.response[0].message : data.message,
              showConfirmButton: true,
              timer: 5000
            });
            // this.router.navigate(['/adminusers'])
    
          } else {
            
            this.loading=false
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
