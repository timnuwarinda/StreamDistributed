import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtService } from './services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pdfSrc = "assets/Slide.pdf";

  title = 'sso-app';
  public doLogin() {
    this.oauthService.initImplicitFlow();
  }
  // public doLogout () {
  //   this.oauthService.logOut();
  // }
  // constructor (private oauthService: OAuthService) {
  //   this.configureSingleSignOn();
  // }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  
constructor(private oauthService: OAuthService, private breakpointObserver: BreakpointObserver,  public jwtService: JwtService , private router: Router) {
  this.configureSingleSignOn();
}
  public doLogout() {
    this.oauthService.logOut();
    this.jwtService.logout();
    this.router.navigate(['']);
  }

  configureSingleSignOn() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler= new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    //this.oauthService.loadDiscoveryDocumentAndLogin();
  }
  get token() {
    let claims: any= this.oauthService.getIdentityClaims();
    return claims? claims: null; 
  }
  
 
}

