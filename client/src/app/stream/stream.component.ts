import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  constructor(private jwtService: JwtService) {
    
   }

  ngOnInit(){
  }

  subscribe(){
     
    let userId = localStorage.getItem('id');
    let email = localStorage.getItem('email');
    let broadcasterId = '5dd38d9c5265a798a56c1d38';

    this.jwtService.subscribe(userId,broadcasterId,email).subscribe((data)=>{

      alert(data.data);
    },
    (error)=>{
      alert("could not subscribe, "+error.message);
    });

  }

}
