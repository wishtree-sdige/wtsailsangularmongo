import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/model/userData';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NGXLogger } from 'ngx-logger';
import { UserEditComponent } from '../user-edit/user-edit.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email:String;
  public password:String;
  public name:String;
  public errorMessage:String;
  public registerSuccess:boolean
  public invalid:boolean;
  status:any;
  successMessage:any;
  
  user:UserData = new UserData();
  constructor(private userservice:UserService,private route:Router,private logger: NGXLogger) { }

  ngOnInit(): void {
  }
Register(){
  this.logger.info("inside register method")
  this.userservice.register(this.user).then(data => {
    let resources = data["status"];
    let message = data["message"];
    if (resources === 200)  {
      this.successMessage=message;
      this.route.navigate(['login']);
    }if(resources === 300){
      this.registerSuccess = false;
      this.invalid=true;
       this.errorMessage =message;
    }else{
      this.errorMessage =message;
    }
  },
  error => {
    console.error(error);
    alert(error);
  });
}
}
