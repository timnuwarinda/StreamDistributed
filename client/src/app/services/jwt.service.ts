import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private httpClient: HttpClient) { }
  login(credentials : any) : any{
      //console.log("before going to server: " + username + " ------- " + password);
      // return this.httpClient.post<any>('http://localhost:3333/login', {"username": username, "password":password})
      //         .subscribe((data)=> { data.access_token} );
      return this.httpClient.post<any>('http://104.154.141.51:3333/account/login',credentials); 
      //.subscribe((data)=> { data.access_token} );
  }
  register(account:any):any {
    return this.httpClient.post<any>('http://104.154.141.51:3333/account/register',account); 
  }
  createStream(stream:any):any {
    return this.httpClient.get<any>('http://104.154.141.51:8080/stream/add/'+stream.broadcasterId+'/'+stream.title); 
  }
  subscribe(userId:String,broadcasterId:String,email:String):any {
    return this.httpClient.post<any>('http://104.154.141.51:3333/account/subscribe',{"userId":userId,"broadcasterId":broadcasterId,"userEmail":email}); 
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usergroup');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
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
    return (localStorage.getItem('usergroup') === "Broadcaster");
  }
  public isViewer(): boolean {
    if(localStorage.getItem('usergroup') ===  null)
      return false; 
    return (localStorage.getItem('usergroup') === "user");
  }
}