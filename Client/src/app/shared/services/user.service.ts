import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import {  Subject } from 'rxjs/internal/Subject';
import{Router}from '@angular/router'



@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  subjectUser = new Subject();
  constructor(private http: HttpClient,private router:Router) { }

  login(username: string, password: string) {

    var config = {
      params: {
        username: username,
        password: password
      }
    }
    return this.http.get('https://fierce-eyrie-49151.herokuapp.com/api/login', config);

  }


  logout() {
    localStorage.removeItem('currentuser');
    localStorage.removeItem('cart');
    this.subjectUser
      .next(undefined);
  }
  register(newuser) {
    return this.http.post("https://fierce-eyrie-49151.herokuapp.com/api/register", JSON.parse(newuser));
  }
  logUserIn(res): any {
    localStorage.setItem("currentuser", JSON.stringify(res));
    localStorage.setItem("cart",JSON.stringify([]));
    this.router.navigate(["/Book-Store/home"]);
    this.subjectUser
      .next(JSON.parse(localStorage.getItem("currentuser")));
  }



}
