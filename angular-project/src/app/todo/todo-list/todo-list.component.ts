import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

export type FilterBy = 'all' | 'active' | 'completed';

export type SortBy = 'title' | 'date';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  @Input()
  public loader: HTMLElement = null;
  @Input()
  public list: HTMLElement = null;
  @Input()
  public isTitleArrowUp: boolean = false;
  @Input()
  public isDateArrowUp: boolean = true;

  @Output()
  public filter = new EventEmitter<FilterBy>();
  @Output()
  public sort = new EventEmitter<SortBy>();

  public filterValue: string = 'all';
  public sortValue: string = 'date';

  public onFilter(model: MatButtonToggleChange) {
    this.filter.emit(model.value);
  }

  public onSort(field: SortBy) {
    this.sort.emit(field);
  }
}
