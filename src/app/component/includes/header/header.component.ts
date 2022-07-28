import { Component, OnInit,OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
userName:string
userEmail:string
currentURL:string

isLoggedIn:boolean=false
  constructor(private service:AuthService) { }
 
  ngOnInit(): void {
    this.getUserInformation()
    this.service.currentLoggedStatus.subscribe(status => this.isLoggedIn = status)
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
