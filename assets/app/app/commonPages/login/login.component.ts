import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import{FormGroup,FormBuilder, Validators} from '@angular/forms';

import { validationMeassages } from '../../validation/validationMeassages';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public model: any;
  
  public errorMessage:String;
  public username:String;
  public password:String;
  public islogin:boolean=false;
  public show:boolean=false;
  public count:number=0;
  successMessage: string;
  public invalidLogin = false;
  loginSuccess = false;
  loginForm:FormGroup;
  status:any;
    private loginSubscription: Subscription = new Subscription();
    formErrors= {
      'username':'',
      'password':'',
    }
    val = new validationMeassages();
   constructor(private readonly userService: UserService, private readonly route: Router,private formBuilder:FormBuilder, private readonly logger: NGXLogger) {
    this.errorMessage = 'Invalid Credentials';
    this.invalidLogin = false;
    this.loginSuccess = false;
    

}

  
    ngOnInit() {
      localStorage.setItem('isLoggedIn', "false"); 
      this.loginForm = this.formBuilder.group({
        username: ['',[]],
        password:['',[Validators.required,Validators.maxLength(6)]]
      });
      this.loginForm.valueChanges.subscribe((data)=>{
        this.loginValidationErrors(this.loginForm)
      })
    }
    loginValidationErrors(group:FormGroup=this.loginForm):void{
      Object.keys(group.controls).forEach((key:string) =>{
       const abstractcontrol= group.get(key);
       this.formErrors[key]='';
      if(abstractcontrol && !abstractcontrol.valid && (abstractcontrol.touched || abstractcontrol.dirty)){
        const messages= this.val.loginFormValidations[key];
        for(const errorKey in abstractcontrol.errors){
          console.log("key = "+key)
          console.log("error ab control  = "+abstractcontrol.errors)
          console.log("msg = "+this.val.loginFormValidations[key])
          if(errorKey){ 
            console.log("error = "+errorKey)
            this.formErrors[key] = messages[errorKey] + '  ';
          }
        }
      }
      });
    }
    public ngOnDestroy(): void {
           if (this.loginSubscription) {
             this.loginSubscription.unsubscribe();
           }     
        }
    public resolved(captchaResponse: string) {

      console.log(`Resolved captcha with response: ${captchaResponse}`);
      if(captchaResponse != null){
        this.show=false;
        this.count=0;
        this.errorMessage = 'Try login again';
      }
    }
  
  
  public handleLogin(): void{ 
    console.log("abb")
    /*const args = [{
       name: "username" ,
       value: "abb",
       validations: Validations.loginFormValidations["username"] ,
   }];
   console.log(args)
    this.userService.validate(args)*/
    //this.Customvalidationservice.customValidation();
    this.loginValidationErrors(this.loginForm);
    console.log(this.formErrors)
  this.logger.info("inside login method")
  this.logger.debug(this.loginForm.controls)
  this.loginSubscription.add(this.userService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe((res) => {
    let resources = res["status"];
    let message = res["message"];
   
    if (resources === 200)  {
      this.count=0;
      this.loginSuccess = true;
      this.successMessage=message;
      localStorage.setItem('isLoggedIn', "true");  
      //localStorage.setItem('token', this.form.controls.username);   
      this.route.navigate(['home']);
    }else if(resources === 300){
      this.count++;
      this.loginSuccess = false;
      this.invalidLogin=true;
     
       this.errorMessage =message;
       if(this.count >= 3){
        this.show=true;
      }
      this.logger.error(message)
    }else{
      this.logger.error(message);
      this.count++;
      this.errorMessage =message;
    }
  }));
  if(this.count >= 3){
    this.show=true;
  }
}

}
