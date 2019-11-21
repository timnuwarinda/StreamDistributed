import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} 
from "@angular/forms";
import { Observable } from "rxjs";
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';

//const jwtDecode = require('jwt-decode');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginError=false; 
  constructor(private formBuilder : FormBuilder, private jwtService: JwtService, private router: Router) { 
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  onSubmit() {
    let token:any= null; 
    let message: string;
    let success:number; 
    let user:any;
    this.submitted = true; 
    this.jwtService.login(this.loginForm.value)
        .subscribe((data)=> { 
            localStorage.setItem ( "access_token",  data.token );
            localStorage.setItem("usergroup", data.userType); 
            localStorage.setItem("username", data.username);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("id", data.id);
           //localStorage.setItem("stream_key", data.user.stream_key);
            this.loginError=false; 
            this.router.navigate(['stream']);
    },(error)=>{
      this.loginError=true; 
    } );
    
    //var decoded = jwtDecode(token);
    //console.log("The result token is " + token);
  }
  get f() { return this.loginForm.controls; }
}
