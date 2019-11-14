import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private httpClient: HttpClient) { }
  login(username:string, password:string) {
      //console.log("before going to server: " + username + " ------- " + password);
      // return this.httpClient.post<any>('http://localhost:3333/login', {"username": username, "password":password})
      //         .subscribe((data)=> { data.access_token} );
      return this.httpClient.post<any>('http://34.67.57.77:3333/login', {"username": username, "password":password}); 
      //.subscribe((data)=> { data.access_token} );
  }
  register(username: string, email:string, password:string, name: string, usergroup: string ) {
    return this.httpClient.post<any>('http://34.67.57.77:3333/register', 
        {"email": email, "password": password, "username": username, "name": name, "usergroup": usergroup}); 
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usergroup');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('stream_key');
  }
  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }
  public isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !==  null;
  }
  public isLoggeout(): boolean {
    return localStorage.getItem('access_token') ===  null;
  }
  public isBroadcaster(): boolean {
    if(localStorage.getItem('usergroup') ===  null)
      return false; 
    return (localStorage.getItem('usergroup') === "B");
  }
  public isViewer(): boolean {
    if(localStorage.getItem('usergroup') ===  null)
      return false; 
    return (localStorage.getItem('usergroup') === "V");
  }
}