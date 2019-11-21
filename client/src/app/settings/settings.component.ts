import { Component, OnInit, Output } from '@angular/core';
import axios from "axios";
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  streamForm: FormGroup;
  submitted = false;
  registerError=false; 
  errorMessage="";
  state;

  email: string; 
  constructor(private formBuilder: FormBuilder, private jwtService: JwtService, private router: Router) { 
    //this.generateStreamKey = this.generateStreamKey.bind(this);
  //  this.email= localStorage.getItem("email");

  }

  ngOnInit() {
     
    this.streamForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  
  }

  generateStreamKey(e){
    axios.post('http://34.69.175.64:3333/settings/stream_key',{
        user: this.email
    })
        .then(res => {
            this.stateUpdate({
                stream_key : res.data.stream_key
            });
        })
  }

  getStreamKey(){
    axios.get('http://34.69.175.64:3333/settings/stream_key',{
      params: {
        user: this.email
      }
    })
        .then(res => {
            this.stateUpdate({
                stream_key : res.data.stream_key
            });
        })
  }
  stateUpdate(lv:any){
    this.state = lv;
    // console.log(`state`,this.state);

  }

  onSubmit(){
   
    let stream = {
      title : this.streamForm.value.title,
      broadcasterId : localStorage.getItem('id')
    };
    this.jwtService.createStream(stream).subscribe((data)=> {
      alert("stream created sucessfully")
      this.streamForm.reset();
        console.log(`Data::`, data);
        //console.log("Registering Failed. .... " + this.errorMessage);
    },
    (error)=>{
      alert("could not create stream, "+error.message);
      this.errorMessage= error.message;
      this.registerError=true; 
    }
    );
  
  }
 
}


