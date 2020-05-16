import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date: Date;
}

@Injectable()
export class TodoService {

  public todoList: Todo[] = [];
  private todoListSubject: Subject<Todo[]> = new Subject<Todo[]>();
  public isLoading: boolean = false;

  constructor() { }

  private getInitialTodoList(): Todo[] {
    const todoList: Todo[] = [
      { id: 1, title: 'Learn HTML and CSS', completed: true, date: new Date(2019, 8, 10) },
      { id: 2, title: 'Learn Java Script', completed: true, date: new Date(2019, 10, 2) },
      { id: 3, title: 'Learn Angular', completed: true, date: new Date(2020, 4, 6) },
      { id: 4, title: 'Create online shop of furniture', completed: false, date: new Date(2020, 5, 6) },
      { id: 5, title: 'Pass interview', completed: false, date: new Date(2020, 6, 6) },
      { id: 6, title: 'Get lots of money', completed: false, date: new Date(2020, 11, 15) }
    ];

    return todoList;
  }

  getTodoListObservable(): Observable<Todo[]> {
    return this.todoListSubject.pipe(delay(400), tap(todoList => {
      this.todoList = todoList;
      this.isLoading = false;
    }));
  }

  save(): void {
    localStorage.setItem('todo', JSON.stringify(this.todoList));
  }

  load(): void {
    this.isLoading = true;
    let loadedData: Todo[];
    try {
      loadedData = JSON.parse(localStorage.getItem('todo'));
    } catch {
      loadedData = null;
    }
    loadedData = !loadedData ? this.getInitialTodoList() : loadedData;
    this.todoListSubject.next(loadedData);
  }

  addTodo(title: string): void {
    const date: Date = new Date();
    const id: number = +date;
    this.todoList.push({ id, title, completed: false, date });
  }

  removeTodo(id: number): void {
    const todoIndex: number = this.todoList.findIndex((todo: Todo) => todo.id === id);
    this.todoList.splice(todoIndex, 1);
  }

  isSaved(): boolean {
    return localStorage.getItem('todo') === JSON.stringify(this.todoList);
  }

  isValidTodo(title: string): boolean {
    return title !== '';
  }
}
