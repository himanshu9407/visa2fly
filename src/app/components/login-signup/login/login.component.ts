import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { GetIPService } from 'src/app/shared/getIP.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm : FormGroup;

  constructor( private loginService : LoginService,private getIP : GetIPService) { }

  ngOnInit() {

    this.loginForm = new FormGroup ({
        'userId' : new FormControl (null,[Validators.required]),
        'password': new FormControl(null,[Validators.required]),
        'rememberMe': new FormControl (false)
    });
    
  }


  onSubmit() {
    console.log(this.loginForm.value)
  this.getIP.getClientIP().subscribe(
    (data) => console.log(data),
    (err) => console.log(err)
  )
  

  }




}