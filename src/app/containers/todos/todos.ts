import { Component, OnInit } from '@angular/core';

import { Todo } from '../../models';
import { TodoService } from '../../services';

@Component({
  selector: 'todos',
  templateUrl: './todos.html',
  styleUrls: ['./todos.css']
})
export class Todos implements OnInit {
  constructor(private todoService: TodoService) {}
  todos: Todo[];

  ngOnInit(): void {
    this.todoService.getTodos()
      .then(todos => this.todos = todos);
  }

  createTodo(todo): void {
    this.todoService.addTodo(todo)
      .then(todo => this.todos.push(todo));
  }

  completeTodo(todo: Todo): void {
    this.todoService.completeTodo(todo)
      .then(() => this.todos = this.todos.filter(it => it !== todo));
  }
}
