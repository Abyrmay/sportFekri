import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {

userUrl: string = "http://localhost:3000/users" ;
public token: string;
private authStatusListener = new Subject<boolean>();
private isUserAuthenticated = false;
private name: string;
constructor (private http: HttpClient, private router: Router) { }
 getToken() {
 return this.token;
 }
 getAuthStatusListener() {
 return this.authStatusListener.asObservable();
 }
 isUserAuth() {
 return this.isUserAuthenticated;
 }
 getName(){
 return this.name;
 }
 signup(obj, img: File) {
 let formData = new FormData();
 formData.append( "firstName" , obj.firstName);
 formData.append( "lastName" , obj.lastName);
 formData.append( "email" , obj.email);
 formData.append( "pwd", obj.pwd);
 formData.append( "img", img);
 return this.http.post<{ message: string }>( this.userUrl + "/subscription" , formData);
 }
 editProfile(newUser) {
 return this.http.put( this.userUrl, newUser);
 }

login(obj) {
  this.http.post<{ obj: any, message: string }>( this.userUrl + "/signin" , obj).subscribe(
  (res) => {
  const token = res.obj.jwt;
  this.token = token;
  if (res.obj) {
  this.isUserAuthenticated = true;
  this.name = res.obj.firstName;
  this.authStatusListener.next( true);
  localStorage.setItem( 'token' , token);
  localStorage.setItem( 'name' , this.name);
  this.router.navigate([ '/']);
  }
  }
  )
  }
  logout() {
  localStorage.removeItem( 'token' );
  localStorage.removeItem( 'name' );
  this.isUserAuthenticated = false ;
  this.authStatusListener.next( false );
  this.router.navigate([ '/']);
  }}