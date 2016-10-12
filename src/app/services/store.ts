import { Injectable } from '@angular/core';
import { Store } from '../store';

@Injectable()
export class StoreService {
  constructor(private store: Store) {}

  setState(ref: string, state: Object): void {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, { [ref]: state }));
  }

  getState(ref: string): Object {
    const state = this.store.getState();
    return state[ref];
  }

  getChanges(ref: string) {
    return this.store.changes
      .pluck(ref);
  }

  isEmpty(ref: string): boolean {
    return this.store.isEmpty(ref);
  }

  dropState(ref: string): void {
    this.store.dropState(ref);
  }
}
