import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stockcategory',
  templateUrl: './stockcategory.component.html',
  styleUrls: ['./stockcategory.component.css']
})
export class StockcategoryComponent implements OnInit {

  createStockCategoryForm: FormGroup;
  submitted = false;
  apiUrl: string;
  // categoryName:string
  // categoryDescription:string
  title:string="Create Stock Category"
  loading:boolean=false

  constructor(

    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private titleService: Title,
    private router: Router,
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)
    if(!this.service.isAthenticated){
      this.router.navigate(['/login'])
    }
    this.initialiseForms();
  }
  
  
  initialiseForms(){
    
    this.createStockCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(225), Validators.pattern(/^[a-zA-Z.+'-]+(?:\s[a-zA-Z.+'-]+)*\s?$/)]],
      categoryDescription: ['', [Validators.nullValidator, Validators.minLength(20),]],
    });

  }
  
  onSubmit(formData:any) {
    this.submitted = true;
    
    if (this.createStockCategoryForm.invalid) {
      return;
    }
    
    const obj = {
      category_name: formData.categoryName,
      category_description: formData.categoryDescription,
    };

    this.postData(obj);
  }
  
      postData(jsonData: any) {
        this.apiUrl = environment.apiURL + 'category/stuck/save';
    
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('admin_access_token')
        });
        this.loading=true
        this.httpClient.post<any>(this.apiUrl, jsonData, { headers: reqHeader }).subscribe(data => {
          
          if (data.status === true) {
            this.loading=false
            this.createStockCategoryForm.reset();
            Object.keys(this.createStockCategoryForm.controls).forEach(key => {
              this.createStockCategoryForm.get(key)?.setErrors(null);
            });
            
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: data.response != null && data.response[0] != undefined ? data.response[0].message : data.message,
              showConfirmButton: true,
              timer: 5000
            });
            this.router.navigate(['/login'])
    
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
