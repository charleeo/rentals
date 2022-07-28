import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { RegisterComponent } from './component/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { LogoutComponent } from './component/logout/logout.component';
import { HeaderComponent } from './component/includes/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './component/includes/sidebar/sidebar.component';
import { StockcategoryComponent } from './component/stockcategory/stockcategory.component';
import { StockComponent } from './component/stock/stock.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    HeaderComponent,
    SidebarComponent,
    StockcategoryComponent,
    StockComponent
  ],
  imports: [
BrowserModule,
    AppRoutingModule,
    NgbModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({
      // animationType: ngxLoadingAnimationTypes.threeBounce,
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
        backdropBackgroundColour: 'rgba(0,0,90,0.3)', 
        backdropBorderRadius: '4px',
        primaryColour: '#feefff', 
        secondaryColour: '#ff88ff', 
        tertiaryColour: '#ffffff'
    }),
    BrowserAnimationsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
