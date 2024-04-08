import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/Shared/Models/Login';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  isLoggedIn:boolean = false;
  currentUser:User = {} as User;
  constructor(private accountService: AccountService) { }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.accountService.isLoggedIn.subscribe(p => {
        this.isLoggedIn = p;
      });
      this.accountService.currentUser.subscribe(p => {
        this.currentUser = p;
      });

      if (this.isLoggedIn && this.currentUser.role == "Admin"){
        return true;
      }
      else {
        return false;
      }
  }
}
