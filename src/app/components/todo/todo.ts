import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../models';

@Component({
  selector: 'todo',
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoItem {
  @Input() todo: Todo;
  @Output() checked = new EventEmitter();
  showCheck: boolean = false;

  toggleCheck(): void {
    this.showCheck = !this.showCheck;
  }

  onCheck(): void {
    this.checked.next(this.todo);
  }
}
