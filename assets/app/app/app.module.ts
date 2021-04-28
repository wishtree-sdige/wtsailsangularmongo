import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule , TranslateLoader} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {UserService} from '../app/services/user.service';
import { MenuService } from './services/menu.service';

import { FooterComponent } from './commonPages/footer/footer.component';
import { HeaderComponent } from './commonPages/header/header.component';
import { LoginComponent } from './commonPages/login/login.component';
import { Error400Component } from './errorPages/error400/error400.component';
import { Error500Component } from './errorPages/error500/error500.component';
import { HomeComponent } from './commonPages/home/home.component'
import { UserEditComponent } from './commonPages/user-edit/user-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterModule } from './register/register.module';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    Error400Component,
    Error500Component,
    HomeComponent,
    UserEditComponent,  
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    RecaptchaModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:(http:HttpClient) =>{return new TranslateHttpLoader(http,'./assets/i18n/','.json')},
        deps:[HttpClient]
      }
    }),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    BrowserAnimationsModule,MaterialModule, RegisterModule,
  ],
  providers: [UserService,MenuService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
