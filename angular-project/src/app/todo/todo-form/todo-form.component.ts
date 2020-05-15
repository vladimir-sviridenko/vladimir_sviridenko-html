import { Component, ViewEncapsulation } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

  public title: string = '';

  constructor(public todoService: TodoService) { }

  addTodo(): void {
    if (this.isValidTodo() && !this.todoService.isLoading) {
      this.todoService.addTodo(this.title);
      this.title = '';
    }
  }

  clear(): void {
    this.title = '';
  }

  isValidTodo(): boolean {
    return this.todoService.isValidTodo(this.title);
  }
}
