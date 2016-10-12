import { Injectable } from '@angular/core';

import { StoreService } from './store';

@Injectable()
export class AuthService {
  constructor(private storeService: StoreService) {}
  ref: string = 'auth';

  login(credentials: Object) {
    this.storeService.setState(this.ref, Object.assign({}, credentials, { loggedIn: true }));
  }

  logout() {
    this.storeService.dropState(this.ref);
  }

  isLoggedIn(): boolean {
    return this.storeService.getState(this.ref)['loggedIn'];
  }
}
