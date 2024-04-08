import { Component } from '@angular/core';
import { AccountService } from '../Core/Services/account.service';
import { NgForm } from '@angular/forms';
import { Login, LoginResponse } from '../Shared/Models/Login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  successfulLogin: boolean = false;
  loginData: Login = { userName: "", password: ""};
  loginResponse: LoginResponse = { username: "", jwtToken: "", expiresIn: 0};

  constructor(private accountService:AccountService, private router:Router) { }

  Login(loginData: Login){
    this.accountService.Login(loginData).subscribe(l => {
      this.loginResponse = l;
      if (this.loginResponse.jwtToken != "" && this.loginResponse.expiresIn > 0){
        this.successfulLogin = true;
        localStorage.setItem("token",this.loginResponse.jwtToken);
        localStorage.setItem("expiration", this.loginResponse.expiresIn.toString());
        localStorage.setItem("loginTime", Date.now().toString());

        this.accountService.populateUserInfoFromToken(this.loginResponse);
      }
      console.log(this.loginResponse);
      this.router.navigateByUrl("/");
    });
  }

}
