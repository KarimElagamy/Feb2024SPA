import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, LoginResponse, User } from 'src/app/Shared/Models/Login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable();

  jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  Login(loginData: Login):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>("https://eshopapigateway.azure-api.net/Products/products", loginData);
  }

  Logout(){
    localStorage.clear();
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next({} as User);
  }

  populateUserInfoFromToken(loginResponse : LoginResponse){
    var tokenValue = localStorage.getItem("token");

    if (tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)){
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.currentUserSubject.next(decodedToken);
      this.isLoggedInSubject.next(true);
    }
  }

  validateJWT(){
    //Code to validate token goes here
    var tokenValue = localStorage.getItem('token');
    if (tokenValue != null){
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(decodedToken);
    };
  }
}
