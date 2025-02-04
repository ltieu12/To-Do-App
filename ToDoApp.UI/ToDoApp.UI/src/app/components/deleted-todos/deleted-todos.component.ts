import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deleted-todos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './deleted-todos.component.html',
  styleUrl: './deleted-todos.component.css'
})
export class DeletedTodosComponent implements OnInit {
  removedToDos: ToDo[] = [];

  constructor(private toDoService: TodoService) {}

  ngOnInit(): void {
    this.getAllDeletedTasks();
  }

  getAllDeletedTasks() {
    this.toDoService.getAllDeletedTasks().subscribe({
      next: (response) => {
        this.removedToDos = response;
      } 
    })
  }

  undoDeletedTask(id: string, deletedTask: ToDo) {
    this.toDoService.undoDeletedTask(id, deletedTask).subscribe({
      next: () => {
        this.getAllDeletedTasks();
      }
    })
  }
}
