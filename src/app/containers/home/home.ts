import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, StoreService } from '../../services';

import '../../../assets/img/angular-logo.png';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['home.css']
})
export class Home implements OnInit {
  constructor(
    private authService: AuthService,
    private storeService: StoreService,
    private router: Router
  ) {}

  input: string = '';
  username: string = '';
  loggedIn: boolean = false;

  ngOnInit(): void {
    this.storeService.getChanges(this.authService.ref)
      .subscribe(state => {
        this.username = state['name'];
        this.loggedIn = state['loggedIn'];
      });
  }

  login() {
    if (this.input.trim()) {
      this.authService.login({
        name: this.input
      });
    }
    this.input = '';
    this.router.navigate(['/todos']);
  }
}
