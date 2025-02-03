import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseApiUrl: string = "https://localhost:7140";
  
  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.baseApiUrl + '/api/ToDo');
  }

  addTask(newTask: ToDo): Observable<ToDo> {
    newTask.id = '00000000-0000-0000-0000-000000000000';
    
    return this.http.post<ToDo>(this.baseApiUrl + '/api/ToDo', newTask);
  }
}
