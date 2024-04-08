import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isLoggedIn: boolean = false;
  constructor(private accountService:AccountService) {}

ngOnInit(): void {
  this.accountService.isLoggedIn.subscribe(p => {
    this.isLoggedIn = p;
  });
}

Logout(){
  this.accountService.Logout();
}
}
