import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.islogged();
  }

  islogged() {
    if(this.authService.isLogged()) {
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }
    return this.isLogged;
  }

}
