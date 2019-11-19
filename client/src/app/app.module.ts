import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { StreamModule } from './stream/stream.module';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './user-management/login/login.component';
import { LogoutComponent } from './user-management/logout/logout.component';
import { RegisterComponent } from './user-management/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { JwtModule } from '@auth0/angular-jwt';
import { DeactivateGuard } from './guards/logout.guard';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularMaterialModule } from './material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    SettingsComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    AppRoutingModule, 
    HttpClientModule, 
    FlexLayoutModule,
    StreamModule,    
    OAuthModule.forRoot(), 
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['http://35.222.37.202:3333'],
        blacklistedRoutes: ['http://35.222.37.202:3333/login']
      }
    }),
    BrowserAnimationsModule,
    AngularMaterialModule,
    PdfViewerModule, 
    MatSliderModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule
  ],
  providers: [DeactivateGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
