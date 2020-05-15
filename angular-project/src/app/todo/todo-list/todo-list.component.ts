import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { TodoService, Todo } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  @Input()
  loader: HTMLElement = null;

  @Input()
  emptyList: HTMLElement = null;

  public todoList: Todo[] = [];
  public editModeIndex: number = null;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodoListObservable().subscribe((todoList) => {
      this.todoList = todoList;
    });
    this.todoService.load();
  }

  removeTodo($event: Event, todo: Todo): void {
    $event.stopImmediatePropagation();
    this.editModeIndex = null;
    this.todoService.removeTodo(todo.id);
  }

  checkTodo($event: Event, todo: Todo): void {
    if (!this.isEditMode(todo.id)) {
      todo.completed = !todo.completed;
    } else {
      const fieldToFocus: HTMLInputElement = ($event.currentTarget as HTMLInputElement).querySelector('.todo-item__edit-input');
      fieldToFocus.focus();
    }
  }

  isEditMode(id: number): boolean {
    return id === this.editModeIndex;
  }

  toggleEditMode($event: Event, todo: Todo): void {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    todo.title = this.todoService.isValidTodo(todo.title) ? todo.title : '—';
    this.editModeIndex = !this.isEditMode(todo.id) ? todo.id : null;
  }
}
