import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errMsg: String;
  constructor(private formBuilder: FormBuilder, private router:Router , private userService:UserService) { }
  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      email : ["",[Validators.required,Validators.email]],
      pwd : ["",[Validators.required]]
    })
  }
  login() {
   let user=this.loginForm.value;
   this.userService.login(user);
  }
}










