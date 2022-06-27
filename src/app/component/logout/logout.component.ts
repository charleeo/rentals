import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private route: Router, private service:AuthService) { }

  ngOnInit(): void {
    this.logOut()
  }
  public logOut() {
    localStorage.clear();
    this.service.updateLoggedInStatus(false);//update the authservice to update the header component
    this.route.navigate(['/login']);
  }
}
