import { Injectable } from '@angular/core';

import { Todo } from '../models';
import { TODOS } from '../../utils/localData';

@Injectable()
export class TodoService {
  todos: Todo[] = TODOS;

  getTodos(): Promise<Todo[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.todos), 350);
    });
  }

  addTodo(todo: Todo): Promise<Todo> {
    return new Promise(resolve => {
      setTimeout(() => resolve(todo), 300);
    });
  }

  completeTodo(todo: Todo): Promise<Todo> {
    return new Promise(resolve => {
      setTimeout(() => resolve(todo), 200);
    });
  }
}
