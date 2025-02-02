import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  toDos: ToDo[] = [];

  constructor(private toDoService: TodoService) {}

  ngOnInit(): void {
    this.toDoService.getAllToDos().subscribe({
      next: (toDos) => {
        this.toDos = toDos;
      }
    });
  }
}
