import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commonPages/login/login.component';
import { Error400Component } from './errorPages/error400/error400.component';
import { Error500Component } from './errorPages/error500/error500.component';

import { UserEditComponent } from './commonPages/user-edit/user-edit.component';

import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './commonPages/home/home.component';


const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
   {path:"login",component:LoginComponent},
   {path:"register",component:RegisterComponent},
   {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
   {path:"edit/:user",component:UserEditComponent},
   
   {path:"error500",component:Error500Component},
   {path:"**",component:Error400Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
