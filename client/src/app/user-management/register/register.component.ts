import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

import { Observable } from "rxjs";
import { MustMatch } from './must-match.validator';
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  registerError=false; 
  errorMessage="";
  Roles: any = ['Viewer', 'Broadcaster'];

  constructor(private formBuilder: FormBuilder, private jwtService: JwtService, private router: Router) { 
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userType: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required], 
      confirm_password: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirm_password')
  });
  }
  onSubmit() {
    let account= this.registerForm.value;
    delete account.confirm_password;

    this.submitted = true;
    this.jwtService.register(account)
      .subscribe((data)=> {
        alert("account saved sucessfully")
          this.router.navigate(['login']); 
          
          //console.log("Registering Failed. .... " + this.errorMessage);
      
      },
      (error)=>{
        this.errorMessage= error.message;
        this.registerError=true; 
      }
      );
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  get f() { return this.registerForm.controls; }
}
