import { Component } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HelpComponent } from './help/help.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  title = 'Todo list';

  constructor(public todoService: TodoService, private bottomSheet: MatBottomSheet) { }

  openHelp() {
    this.bottomSheet.open(HelpComponent);
  }
}
