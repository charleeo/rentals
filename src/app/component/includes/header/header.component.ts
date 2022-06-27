import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
userName:string
userEmail:string

isLoggedIn:boolean=false
  constructor(private service:AuthService) { }

  ngOnInit(): void {
    this.getUserInformation()
    this.service.currentLoggedStatus.subscribe(status => this.isLoggedIn = status);
    if(this.service.isAthenticated){
      this.isLoggedIn=true
    }
  }

  getUserInformation(){
    let userData = localStorage.getItem('user_data')
    if(userData && userData !==null){
     let  parsedData= JSON.parse(userData)
      this.userName = parsedData?.name
      this.userEmail = parsedData?.email
    }
  }

}
