import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AutofocusDirective } from './shared/autofocus.directive';
import { HelpComponent } from './help/help.component';

import { TodoService } from './shared/todo.service';

const MaterialModules = [
  MatInputModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatFormFieldModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoFormComponent,
    TodoListComponent,
    AutofocusDirective,
    HelpComponent,
    TodoComponent,
    TodoItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ...MaterialModules,
  ],
  exports: [
    TodoComponent
  ],
  providers: [TodoService],
  bootstrap: [TodoComponent]
})
export class TodoModule { }
