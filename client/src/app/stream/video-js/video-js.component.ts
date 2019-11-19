import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import videojs from 'video.js';
import axios from "axios";
import { Observable } from 'rxjs';
import { of as ObservableOf } from 'rxjs';
import config from '../../../config/default';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route : ActivatedRoute) { 
    route.params.subscribe(params=>{this.usernme= params['username']})
    // console.log(`username:::`,this.usernme);
  }


  ngOnInit() {
    // const options = null;

    if (this.vjs) {
      // console.log(`Player disposed:::`);

      this.vjs.dispose()
    }
    // this.vjs = videojs('stream-player', options);

    this._state = {
      stream: false,
      videoJsOptions: null
    }
    axios.get('http://35.192.161.182:3333/user', {

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
                  src: 'http://35.192.161.182:' + config.rtmp_server.http.port + '/live/' + res.data.stream_key + '/index.m3u8',
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
 
}