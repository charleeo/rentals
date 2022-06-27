import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public logginStatus: boolean = false;
  private loggedInStatus = new BehaviorSubject(this.logginStatus)
  currentLoggedStatus = this.loggedInStatus.asObservable();

  constructor() { }
  
  get isAthenticated():boolean{
    const token = localStorage.getItem(environment.token)
    return   token !== null? true:false
  }

  updateLoggedInStatus(status: boolean) {
    this.loggedInStatus.next(status)
  }
}
