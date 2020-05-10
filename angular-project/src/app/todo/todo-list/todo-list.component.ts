import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { openCloseAnimation } from '../shared/open-close.animation';
import { TodoService, Todo } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: openCloseAnimation
})
export class TodoListComponent implements OnInit {

  public todoList: Todo[] = [];
  public todoToEditIndex: number = null;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodoListObservable().subscribe((todoList) => {
      this.todoList = todoList;
    });
    this.todoService.load();
  }

  onRemove($event: Event, todo: Todo): void {
    $event.stopImmediatePropagation();
    this.stopEditing($event, todo);
    this.todoService.removeTodo(todo.id);
  }

  onCheck($event: Event, todo: Todo): void {
    if (!this.isEditing(todo.id)) {
      todo.completed = !todo.completed;
    } else {
      const fieldToFocus: HTMLInputElement = ($event.currentTarget as HTMLInputElement).querySelector('.todo-list__edit-input');
      fieldToFocus.focus();
    }
  }

  isEditing(id: number): boolean {
    return id === this.todoToEditIndex;
  }

  startEditing($event: Event, todo: Todo): void {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    if (!this.isEditing(todo.id)) {
      this.todoToEditIndex = todo.id;
    } else if ($event.type === 'contextmenu') {
      this.stopEditing($event, todo);
    }
  }

  stopEditing($event: Event, todo: Todo): void {
    $event.stopImmediatePropagation();
    this.todoToEditIndex = null;
    todo.title = this.todoService.truncate(todo.title, this.todoService.titleMaxLength);
  }
}
