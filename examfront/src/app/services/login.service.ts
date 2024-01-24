import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }


  // get current user details which is currently login
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }


  //generate token
  public generateToken(loginData:any) {
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  //loginUser : set token user in localstorage
  public loginUser(token:any) {
    localStorage.setItem("token",token);
   
    return true;
  }


  //IsLogin : user is logged in or not
  public isLoggedIn() {
    let tokenstr=localStorage.getItem('token')
    if(tokenstr==undefined || tokenstr==''|| tokenstr==null) {
      return false;
    }else {
      return true;
    }
  }


  // logout : remove token form local storage

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // getToen : return the token and store the userDetails

  public getToken() {
    return localStorage.getItem('token');
  }

  // setUserDetails : set user details
  public setuser(user:any) {
    localStorage.setItem('user',JSON.stringify(user));
  }

  //GetUser

  public getUser() {
    let userstr = localStorage.getItem("user");
    if(userstr != null) {
      return JSON.parse(userstr);
    }else {
      this.logout();
      return null;
    }
  }

  //get user details

  public getuserrole() {
    let user = this.getUser();
    return user.authorities[0].authority
  }

}
