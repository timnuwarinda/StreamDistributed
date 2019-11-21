import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { VideoJsComponent } from './video-js/video-js.component';
import { LivestreamsComponent } from './livestreams/livestreams.component';
import { StreamComponent } from './stream.component';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from '../navigation/navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  
  {path: '', component:LivestreamsComponent},
  {path: ":username", component: VideoJsComponent}
];

@NgModule({
  declarations: [
    VideoJsComponent,
    LivestreamsComponent,
    StreamComponent,
    NavigationComponent,
    ChatComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    AvatarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class StreamModule {
  urlVideo = 'https://vod.vodgc.net/gid7/vod/vodgc/vodgc/28/18-284-8-GCZKTJ1538104527_480P.mp4/tracks-v1a1/index.m3u8';
  // tslint:disable-next-line:max-line-length
  urlPoster = 'https://store.storeimages.cdn-apple.com/4667/as-images.apple.com/is/image/AppleInc/aos/published/images/w/at/watch/modelheader/watch-modelheader-series4-hero-201809?wid=629&hei=383&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1536009686693';

 }
