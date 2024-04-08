import { Component, OnInit } from '@angular/core';
import { AccountService } from './Core/Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Feb2024SPA';

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.validateJWT();
  }
}
