import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  hasNotJoined:boolean = true;
  messages = [];
  message: string;

  constructor(private chatService : ChatService) { }

  ngOnInit() {
    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });
  }


  joinRoom() {
    this.hasNotJoined = false;
    this.chatService.joinRoom();
    
  }

  sendMessage(){
    this.chatService.sendMessage(this.message);
  }


  typing(){
    this.chatService.typing();
  }

}
