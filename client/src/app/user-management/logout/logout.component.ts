import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

import { Observable } from "rxjs";
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';

//const jwtDecode = require('jwt-decode');

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'], 
})
export class LogoutComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginError=false; 
  constructor(private formBuilder: FormBuilder, private jwtService: JwtService, private router: Router) { 
  }
  ngOnInit() {

  }
  onSubmit() {
    if(this.jwtService.loggedIn){
      this.jwtService.logout();
    }
  }    
  onLogout() {
    this.onSubmit();
  }
  get f() { return this.loginForm.controls; }
  canDeactivate () {
    //return confirm("Are you sure you want to logout?");
    //console.log('to exit logout');
    //return true;

  }
}
