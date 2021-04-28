import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { UserData } from '../../model/userData';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public email:String;
  public password:String;
  public name:String;
  public errorMessage:String;
  public registerSuccess:boolean
  public invalid:boolean;
  status:any;
  successMessage:any;
  user:UserData;
  uid:any;
  constructor(private userservice:UserService,private route:Router,private logger: NGXLogger,private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.uid =  this.activeroute.snapshot.params.user;
    console.log(this.uid)

  }
edituser(){
  this.logger.info("inside register method")
  this.userservice.edit(this.uid).then(data => {
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
    this.route.navigate(['home']);
  });
}
}
