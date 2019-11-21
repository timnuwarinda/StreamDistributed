import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import videojs from 'video.js';
import axios from "axios";
import { Observable } from 'rxjs';
import { of as ObservableOf } from 'rxjs';
import config from '../../../config/default';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-video-js',
  templateUrl: './video-js.component.html',
  styleUrls: ['./video-js.component.css']
})
export class VideoJsComponent implements OnDestroy, OnInit {

  public vjs: videojs.Player;
  stream$: {};
  _state;
  usernme: string;

  @Input() urlVideo: string;
  @Input() urlPoster: string;

  constructor(private route : ActivatedRoute, private jwtService: JwtService,private chatService:ChatService ) { 
    route.params.subscribe(params=>{this.usernme= params['username']})
    // console.log(`username:::`,this.usernme);
  }


  ngOnInit() {
    // const options = null;
    let usrname = localStorage.getItem('username');
    // this.chatService.setUserDetails(this.usernme,usrname);

    if (this.vjs) {
      // console.log(`Player disposed:::`);

      this.vjs.dispose()
    }
    // this.vjs = videojs('stream-player', options);

    this._state = {
      stream: false,
      videoJsOptions: null
    }
    axios.get('http://104.154.141.51:3333/user', {

    // axios.get('/user', {
      params: {
          username: this.usernme
      }
    }).then(res => {
      // console.log(`state res`,res);

      this.stateUpdate({
          stream: true,
          videoJsOptions: {
              autoplay: false,
              controls: true,
              sources: [{
                  src: 'http://35.192.161.182:8080/data/live/' + res.data.stream_key + '/index.m3u8',

                  // src: 'http://35.188.66.26:' + config.rtmp_server.http.port + '/live/' + res.data.stream_key + '/index.m3u8',
                  // src: 'http://35.192.161.182:8080/data/live/fTRSLu31/index.m3u8',
                  type: 'application/x-mpegURL'
              }],
              fluid: true,
          }
      });
    })

  }

  ngAfterContentChecked(){
    
  }

  ngOnDestroy() {
    this.vjs.dispose()

  }
  
  stateUpdate(lv:any){
    this._state = lv;
    this.stream$ =this._state;
    // console.log(`state`,this.stream$);

    this.vjs = videojs('stream-player', this._state.videoJsOptions, function onPlayerReady() {
      // console.log('onPlayerReady', this)
    });

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