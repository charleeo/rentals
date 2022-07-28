import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router,Event as NavigationEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'rerntals';
  sideBarAssociatedROutes: string[] =['/','/login','/register','/home']
  sideBarShouldNotShow :boolean = false
  navigatedURL :string
  onActivate(event:any) {
    window.scrollTo(0,0);
  }

  
  event$
  constructor(private router:Router, private authService: AuthService){
    this.event$
      =this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationStart ) {
            console.log(event.url)
            if (!this.sideBarAssociatedROutes.includes(event.url)) {
              // this.sideBarShouldNotShow=true
              this.authService.updateSidebarViewStatus(true)
            }
          }
        });
      }
      
      ngOnDestroy() {
        this.event$.unsubscribe();
      }

      ngOnInit(): void {
        this.authService.currentSidebarViewStatus.subscribe(status => this.sideBarShouldNotShow = status)
      }
}


