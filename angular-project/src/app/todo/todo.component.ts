import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from './shared/todo.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HelpComponent } from './help/help.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public appTitle = 'Todo list';
  public todoTitle = '';
  public todoList: Todo[] = [];
  public editModeIndex: number = null;

  constructor(public todoService: TodoService, private bottomSheet: MatBottomSheet) { }

  openHelp() {
    this.bottomSheet.open(HelpComponent);
  }

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

  addTodo(): void {
    if (this.canAdd()) {
      this.todoService.addTodo(this.todoTitle);
      this.clearForm();
    }
  }

  clearForm(): void {
    this.todoTitle = '';
  }

  canAdd(): boolean {
    return !this.todoService.isLoading && this.todoService.isValidTodo(this.todoTitle);
  }
}
