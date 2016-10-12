import { Routes } from '@angular/router';

import { Home, NotFound, Todos, SwPeople } from './containers';
import { SwPerson } from './components';
import { AuthGuard } from './services';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'todos',
    component: Todos,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: SwPeople,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/:id',
    component: SwPerson,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFound
  }
];
