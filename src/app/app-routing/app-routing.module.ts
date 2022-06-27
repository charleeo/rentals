import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../component/home/home.component';
import { RegisterComponent } from '../component/register/register.component';
import { LoginComponent } from './../component/login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../guard/auth.guard';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { LogoutComponent } from '../component/logout/logout.component';

const routes:Routes=[
  {
    path:"",
    redirectTo :"/home",
    pathMatch:"full"
  },
  {
    path:"home",
    component:HomeComponent,
    // redirectTo :"/home"
  },
  {
    path:"logout",
    component:LogoutComponent,
  },
  {
    path:"register", component:RegisterComponent
  },
  {
    path:"login", component:LoginComponent,children:[]
  },
  {
    path:"dashboard", component:DashboardComponent, canActivate:[AuthGuard]
  },
  {
    path:"**", component:PageNotFoundComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
