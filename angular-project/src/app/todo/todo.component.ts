import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from './shared/todo.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HelpComponent } from './help/help.component';
import { FilterBy, SortBy } from './todo-list/todo-list.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public appTitle = 'Todo List';
  public todoTitle = '';
  public todoList: Todo[] = [];
  public editModeIndex: number = null;

  public isSortedByTitleAscending = false;
  public isSortedByDateAscending = true;
  private lastSortedField: SortBy = 'date';
  private lastFilterParam = 'all';

  constructor(public todoService: TodoService, private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.todoService.getTodoListObservable().subscribe(() => this.updateTodoList());
    this.todoService.load();
  }

  public openHelp() {
    this.bottomSheet.open(HelpComponent);
  }

  public removeTodo($event: Event, todo: Todo): void {
    $event.stopImmediatePropagation();
    this.editModeIndex = null;
    this.todoService.removeTodo(todo.id);
  }

  public checkTodo($event: Event, todo: Todo): void {
    if (!this.isEditMode(todo.id)) {
      todo.completed = !todo.completed;
    } else {
      const fieldToFocus: HTMLInputElement = ($event.currentTarget as HTMLInputElement).querySelector('.todo-item__edit-input');
      fieldToFocus.focus();
    }
  }

  public isEditMode(id: number): boolean {
    return id === this.editModeIndex;
  }

  public toggleEditMode($event: Event, todo: Todo): void {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    todo.title = this.todoService.isValidTodo(todo.title) ? todo.title : '—';
    this.editModeIndex = !this.isEditMode(todo.id) ? todo.id : null;
  }

  public addTodo(): void {
    if (this.canAdd()) {
      this.todoService.addTodo(this.todoTitle);
      this.clearForm();
    }
  }

  public clearForm(): void {
    this.todoTitle = '';
  }

  public canAdd(): boolean {
    return !this.todoService.isLoading && this.todoService.isValidTodo(this.todoTitle);
  }

  public filterTodoListBy(param: FilterBy): void {
    switch (param) {
      case 'all':
        this.todoList = [...this.todoService.todoList];
        break;
      case 'active':
        this.todoList = this.todoService.todoList.filter((todo) => !todo.completed);
        break;
      case 'completed':
        this.todoList = this.todoService.todoList.filter((todo) => todo.completed);
        break;
    }
    this.lastFilterParam = param;
    this.applySorting();
  }

  public sortTodoListBy(field: SortBy): void {
    const byTitle: boolean = (field === 'title');
    this.todoList = this.todoList.concat().sort((todo, nextTodo) => {
      const todoField = byTitle ? todo.title.toString().toLowerCase() : todo.date;
      const nextTodoField = byTitle ? nextTodo.title.toString().toLowerCase() : nextTodo.date;
      const result: boolean = (byTitle ? this.isSortedByTitleAscending : this.isSortedByDateAscending)
        ? todoField < nextTodoField
        : todoField > nextTodoField;
      return result ? 1 : -1;
    });
    if (byTitle) {
      this.isSortedByTitleAscending = !this.isSortedByTitleAscending;
      this.isSortedByDateAscending = false;
      this.lastSortedField = 'title';
    } else {
      this.isSortedByTitleAscending = false;
      this.isSortedByDateAscending = !this.isSortedByDateAscending;
      this.lastSortedField = 'date';
    }
  }

  private updateTodoList() {
    this.todoList = [...this.todoService.todoList];
    this.filterTodoListBy(this.lastFilterParam as FilterBy);
    this.applySorting();
  }

  private applySorting() {
    if (this.lastSortedField === 'title') {
      this.isSortedByTitleAscending = !this.isSortedByTitleAscending;
      this.sortTodoListBy('title');
    } else if (this.lastSortedField === 'date') {
      this.isSortedByDateAscending = !this.isSortedByDateAscending;
      this.sortTodoListBy('date');
    }
  }
}
