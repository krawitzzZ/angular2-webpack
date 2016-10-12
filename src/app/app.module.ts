import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app';
import { Home, NotFound, Todos, SwPeople } from './containers';
import { AddTodo, TodoItem, ColorPicker, SwPerson } from './components';

import { Store } from './store';
import {
  StoreService,
  AuthService,
  TodoService,
  AuthGuard,
  SwapiService
} from './services';
import { routes } from './router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  declarations: [
    AppComponent,
    NotFound,
    Home,
    Todos,
    SwPeople,
    SwPerson,
    AddTodo,
    ColorPicker,
    TodoItem
  ],
  providers: [
    Store,
    StoreService,
    AuthService,
    TodoService,
    AuthGuard,
    SwapiService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
