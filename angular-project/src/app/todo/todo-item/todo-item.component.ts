import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../shared/todo.service';
import { openCloseAnimation } from '../shared/open-close.animation';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: openCloseAnimation
})
export class TodoItemComponent implements OnInit {

  @Input()
  public todo: Todo;
  @Input()
  public isEditMode: boolean;

  @Output()
  check = new EventEmitter();
  @Output()
  toggleEditMode = new EventEmitter();
  @Output()
  remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onCheck($event: Event): void {
    this.check.emit($event);
  }

  public onToggleEditMode($event: Event): void {
    this.toggleEditMode.emit($event);
  }

  public onRemove($event: Event): void {
    this.remove.emit($event);
  }
}
