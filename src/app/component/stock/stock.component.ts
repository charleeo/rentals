import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  createStockForm: FormGroup;
  submitted = false;
  apiUrl: string;
  costPrice:number
  title:string="Create Stock record"
  loading:boolean=false
   today :string | null

  constructor(

    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private titleService: Title,
    private router: Router,
    private service: AuthService
  ) { 
  }
  
  ngOnInit(): void {
    this.titleService.setTitle(this.title)
    if(!this.service.isAthenticated){
      this.router.navigate(['/login'])
    }
    this.initialiseForms();
    this.today = new DatePipe("en-US").transform(new Date, "yyyy-MM-dd")
  }
  
  initialiseForms(){
    
    this.createStockForm = this.formBuilder.group({
      itemName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(225), Validators.pattern(/^[a-zA-Z.+'-]+(?:\s[a-zA-Z.+'-]+)*\s?$/)]],
      itemDescription: ['', [Validators.nullValidator, Validators.minLength(20),]],
      arrivalDate: [this.today, [Validators.nullValidator]],
      soldDate: [this.today, [Validators.nullValidator]],
      costPrice: ['', [Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    });

  }
  
  onSubmit(formData:any) {
    this.submitted = true;
    
    if (this.createStockForm.invalid) {
      return;
    }
    
    const obj = {
      stock_name: formData.itemName,
      stock_description: formData.itemDescription,
      arrival_date: formData.arrivalDate,
      sold_date: formData.soldDate,
      cost_price: formData.costPrice,
    };

    this.postData(obj);
  }
  
      postData(jsonData: any) {
        this.apiUrl = environment.apiURL + 'stock/create';
      
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('bearer_token')
        });
      
        this.loading=true
        this.httpClient.post<any>(this.apiUrl, jsonData, { headers: reqHeader }).subscribe(data => {
          
          if (data.status === true) {
            this.loading=false
            this.createStockForm.reset();
            Object.keys(this.createStockForm.controls).forEach(key => {
              this.createStockForm.get(key)?.setErrors(null);
            });
            
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: data.response != null && data.response[0] != undefined ? data.response[0].message : data.message,
              showConfirmButton: true,
              timer: 5000
            });
    
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


// $table->string('stock_name');
//             $table->string('stock_image')->nullable();
//             $table->text('stock_description')->nullable();
//             $table->date('arrival_date');
//             $table->date('sold_date')->nullable();
//             $table->double('cost_price')->default(0.00);
//             $table->double('sales_price')->default(0.00);
//             $table->double('logistics_cost')->default(0.00);
//             $table->double('profit')->default(0.00);
//             $table->string('quntity_received')->default(0);
//             $table->string('quntity_sold')->default(0);
//             $table->string('quntity_left')->default(0);
//             $table->foreignId('stock_category_id');
