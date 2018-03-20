import { Injectable } from '@angular/core';
import { User } from '../model/User';
import {HttpClient,HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
//import {  Headers, RequestOptions, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenStorage } from './token.storage';

//import { AuthenticationService } from "./auth.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private apiUrl1 = 'http://localhost:8080/user';
  private apiUrl12 = 'http://localhost:8080/user/delete';
  private apiUrl13 = 'http://localhost:8080/user/update';
  constructor(private http:HttpClient,
              private token:TokenStorage) { 
                console.log("User Service Started");
              }
  //public message:boolean;  
  //value:boolean;            
  public check(){
    console.log(this.token.getToken());
    if (this.token.getToken() != null){
      //this.message=true;
      this.messageSource.next(true);
    }
  }

  

  public loggedIn:boolean;
  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();

  private idSource = new BehaviorSubject<number>(null);
  currentid = this.idSource.asObservable();

  create(user: User) {
    console.log("crerate");
    return this.http.post(this.apiUrl, user);
  }

  public getUsers(): Observable<User[]> {
    
    return this.http.get<User[]>(this.apiUrl1);
  }

  public getUser(id:Number):Observable<User> {
   
    return this.http.get<User>(this.apiUrl1 +'/'+id);
  }
  
  public deleteUser(id:number):Observable<User> {
    return this.http.delete<any>(this.apiUrl12+'/'+id);
  }

  public updateUser(user:User,id:number):Observable<User>{
    return this.http.put<User>(this.apiUrl13+'/'+id,user);
  }

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  changeId(id:number){
    this.idSource.next(id);
  }

  /*findAll(): Observable<User[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }*/
}