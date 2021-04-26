import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { UserData } from 'src/app/model/userData';
import {OnDestroy, NgZone } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  public data: UserData[];
  public on: boolean = false;
  public myId: number = 0;
  public errorMessage:String;
  dataSource = new MatTableDataSource<UserData>(this.data)
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private userservice:UserService,private route:Router,private logger: NGXLogger,private zone: NgZone) { }

  ngOnInit(){ 
    this.dataSource.paginator = this.paginator;
    this.loadData()
    
  }
  loadData(){
    let result=this.userservice.getalluser();
    result.subscribe(res => {
     this.data = res["data"];
    }, //Bind to view
    error => {
      // Log errors if any
      console.log(error);
      alert(error);
    });
  }
  deleteUser(uid){
    console.log(uid)
    this.logger.info("inside login method")
    this.userservice.delete(uid).then( res => {
      let resources = res["status"];
      let message = res["message"];
      if (resources === 200)  {
        alert("Deleted successfully");
        this.loadData()
        this.route.navigate(['home']);
      }else if(resources === 300){
         this.errorMessage =message;
         alert(this.errorMessage);
      }else{
        this.errorMessage =message;
        alert(this.errorMessage);
      }
    })  
  }
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    this.route.navigate(['login']);
    }    
}
