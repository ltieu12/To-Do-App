import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  toDoList: ToDo[] = [];
  newTask: ToDo = {
    id: '',
    description: '',
    createdDate: new Date(),
    isCompleted: false,
    completedDate: new Date(),
    isRemoved: false,
    removedDate: new Date()
  };
  
  constructor(private toDoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.toDoService.getAllTasks().subscribe({
      next: (toDos) => {
        this.toDoList = toDos;
      }
    });
  }

  addTask() {
    this.toDoService.addTask(this.newTask).subscribe({
      next: () => {
        this.getAllTasks();
      }
    });
  }

  onCompletedChange(id: string, task: ToDo) {
    task.isCompleted = !task.isCompleted;
    this.toDoService.updateTask(id, task).subscribe({
      next: () => {
        this.getAllTasks();
      }
    });
  }

  removeTask(id: string) {
    this.toDoService.removeTask(id).subscribe({
      next: () => {
        this.getAllTasks();
      }
    })
  }
}
