import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services';
import { Store } from './store';

@Component({
  selector: 'app',
  template: `
    <header>
      <ul>
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
        <li><a routerLink="/todos" routerLinkActive="active">Todos</a></li>
        <li><a routerLink="/people" routerLinkActive="active">People</a></li>
        <li><a routerLink="/not-exists" routerLinkActive="active">404</a></li>
      </ul>
      <span *ngIf="username" class="username">Logged in as {{ username }}</span>
      <button *ngIf="username" class="logout btn-light" (click)="logout()">Log out</button>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [`
    header {
      position: relative;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: paleturquoise;
    }
    ul {
      display: flex;
      align-items: center;
    }
    li {
      margin: 0 5px;
    }
    .username {
      position: absolute;
      height: 60px;
      top: 0;
      right: 100px;
      font-weight: bold;
      line-height: 60px;
      font-size: 16px;
      color: rgba(0,0,0,0.72);
    }
    .logout {
      position: absolute;
      right: 10px;
    }
    a {
      font-size: 16px;
      color: rgba(0,0,0,0.72);
      text-decoration: none;
    }
    a:visited {
      color: rgba(0,0,0,0.72);
    }
    a:focus {
      color: rgba(0,0,0,0.72);
    }
    .active {
      color: darkred !important;
      font-weight: bold;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}
  private username: string;

  ngOnInit(): void {
    this.store.changes
      .pluck(this.authService.ref)
      .subscribe(state => this.username = state['name']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
