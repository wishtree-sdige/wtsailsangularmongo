import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions, ResponseType } from '@angular/http';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { UserData } from '../model/userData';
const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private basicURL ="http://localhost:1337"
  constructor(private http:HttpClient,private logger: NGXLogger) { }

  login(username:String,password:String): Observable<JSON>{
    this.logger.info("inside login service method")
    var content = JSON.stringify({
       username,password
    });
    return this.http.post<JSON>(this.basicURL+'/api/login',content,httpOptions);
  }
  register(user:UserData): Promise<any>{
    this.logger.info("inside register service method")
    return this.http.post(this.basicURL+'/api/registration', JSON.stringify(user),httpOptions).toPromise().catch(this.handleErrorPromise);
  }
  getalluser()
  {
    var content = JSON.stringify({
    });
    this.logger.info("inside getall user service method")
    return this.http.post<any>(this.basicURL+'/api/getUserList',content,httpOptions);
  }
  edit(user):Promise<any>{
    this.logger.info("inside edit service method")
    return this.http.post(this.basicURL+'/api/editUser', JSON.stringify(user),httpOptions).toPromise().catch(this.handleErrorPromise); 
  }
  delete(uid):Promise<any>{
  this.logger.info("inside delete user service method")
  return this.http.post(this.basicURL+'/api/deleteUser', JSON.stringify({"uid":uid}),httpOptions).toPromise().catch(this.handleErrorPromise);
  }
  validate(args):Promise<any>{
    this.logger.info("insidevalidate service method")
    return this.http.post(this.basicURL+'/api/validate', JSON.stringify(args),httpOptions).toPromise().catch(this.handleErrorPromise);
    }
private handleErrorPromise(error: Response | any) {
  this.logger.error(error.message || error);
  return Promise.reject(error.message || error);
}
}