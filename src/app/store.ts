import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

const defaultState = {
  auth: {
    name: '',
    loggedIn: false
  },
  swapi: {}
};

const _state = new BehaviorSubject(defaultState);

@Injectable()
export class Store {
  private state = _state;
  changes = this.state.asObservable()
    .distinctUntilChanged();

  setState(state): void {
    this.state.next(state);
  }

  getState() {
    return this.state.value;
  }

  isEmpty(ref: string): boolean {
    const currState = this.getState()[ref];
    const defState = defaultState[ref];
    for (let prop in currState) {
      if (!defState.hasOwnProperty(prop) || currState[prop] !== defState[prop]) {
        return false;
      }
    }
    return true;
  }

  dropState(ref: string): void {
    const currentState = this.getState();
    this.state.next(Object.assign({}, currentState, { [ref]: defaultState[ref] }));
  }

  purge(): void {
    this.state.next(defaultState);
  }
}
