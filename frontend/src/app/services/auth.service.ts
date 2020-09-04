import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL='http://localhost:3000'

  constructor(private http: HttpClient) { }

  

  signUp(user){
    
    //console.log(user);
    return this.http.post<any>(this.URL + '/add',user);
  }

  signIn(user){
    
    //console.log(user);
    return this.http.post<any>(this.URL + '/login',user);
  }  

  loggedIn(){
    return!!localStorage.getItem('token');
  }
}
