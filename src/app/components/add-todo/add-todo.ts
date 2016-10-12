import { Component, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../models';

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.html',
  styleUrls: ['./add-todo.css']
})
export class AddTodo {
  @Output() newTodo = new EventEmitter();
  colors: Array<string> = ['#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
  todo = <Todo>{
    title: '',
    description: '',
    color: 'white'
  };

  onColorSelect(color) {
    this.todo.color = color;
  }

  addTodo() {
    const { title, description, color } = this.todo;

    if (title && description) {
      this.newTodo.next({
        title: title.trim(),
        description: description.trim(),
        color
      });
      this.todo = <Todo>{
        title: '',
        description: '',
        color: 'white'
      };
    }
  }
}
