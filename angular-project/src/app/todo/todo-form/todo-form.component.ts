import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent {

  @Input()
  public title: string = '';
  @Input()
  public canAdd: boolean = false;

  @Output()
  public titleChange = new EventEmitter<string>();
  @Output()
  public add = new EventEmitter();
  @Output()
  public clear = new EventEmitter();

  constructor() {}

  public onAdd() {
    this.add.emit();
  }

  public onClear() {
    this.clear.emit();
  }

  public isEmptyTitle() {
    return this.title === '';
  }

  public onTitleChange(model: string) {
    this.title = model;
    this.titleChange.emit(model);
  }
}
