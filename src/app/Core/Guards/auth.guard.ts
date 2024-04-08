import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { LoginResponse, User } from 'src/app/Shared/Models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn:boolean = false;
  currentUser:User = {} as User;
  constructor(private accountService: AccountService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.accountService.isLoggedIn.subscribe(p => {
        this.isLoggedIn = p;
      });
      this.accountService.currentUser.subscribe(p => {
        this.currentUser = p;
      });

      if (this.isLoggedIn){
        return true;
      }
      else {
        return false;
      }
  }
  
}
