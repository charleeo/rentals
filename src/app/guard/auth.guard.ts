import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import  Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.service.isAthenticated ===false){
        Swal.fire({
          icon: 'error',
          title: 'Warning',
          text: "You need to be logged in to access this resource",
          showConfirmButton: true,
          timer: 5000
        });
        
       this.router.navigate(['login'],{queryParams: {redirectUrl: state.url}})
      }
    return true;
  }
  
}
