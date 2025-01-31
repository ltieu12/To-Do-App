import { Component } from '@angular/core';
import { ToDo } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  toDos: ToDo[] = [];
}
