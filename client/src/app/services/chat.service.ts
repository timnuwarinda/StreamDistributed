import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

   //private url = 'http://104.198.164.77:8080'; 
   url:string = 'http://chatservice:8080'; 
   //url:string = process.env.chatServerUrl;|| 'develop'
   
   
   socket: any;  
 
 
   constructor() { 
     this.socket = io(this.url);
   }
 
   createUser = () => {
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
           var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
           return v.toString(16);
       });
   }
   userDetails:any = {
    handle : this.createUser().slice(0, 5),
    room : 'StreamKey'
  }

  // setting user details
  //  setUserDetails:object(strmkey, usrname){
  //   this.userDetails ={
  //   "handle":usrname,
  //   "room": strmkey
  //   }
  //  }
   
 
 
   joinRoom = () => {
     console.log("You clicked to Join : " + this.userDetails.handle);
     //Fire Join Room event
     this.socket.emit('joinRoom', this.userDetails);
   }
 
   sendMessage = (message) => {
     console.log("Passed Message !! "+message);
      let data = {
       handle : localStorage.getItem('username'),
       room : this.userDetails.room,
       message : message
     }
     this.socket.emit('chat', data);
   }
 
   //Listen for events
   listening = () => {
       this.socket.on('chat',(data)=>{
         console.log("Received from server : "+ data);
       //feedback.innerHTML = '';
       //message.value = '';
       //output.innerHTML += '<p><strong>' + data.handle + ' : </strong>' + data.message + '</p>';
       });
       
       this.socket.on('typing', (data) => {
        //  console.log("Some fuck!!! is typing " + data);
           //feedback.innerHTML = '<p><em>' + data.handle + ' is typing something...</em></p>';
       });
   }
 
    getMessages = () => {
     return Observable.create((observer) => {
         this.socket.on('new message', (message) => {
             observer.next(message);
         });
     });
   }
 
   typing = () => {
     console.log('Someone is typing here!!!');
   }
}
