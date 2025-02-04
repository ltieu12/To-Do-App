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

  updateTask(id: string, updateTask: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(this.baseApiUrl + '/api/ToDo/' + id, updateTask);
  }

  removeTask(id: string): Observable<ToDo> {
    return this.http.delete<ToDo>(this.baseApiUrl + '/api/ToDo/' + id);
  }

  getAllDeletedTasks(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.baseApiUrl + '/api/ToDo/get-deleted');
  }

  undoDeletedTask(id: string, deletedTask: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(this.baseApiUrl + '/api/ToDo/undo-deleted/' + id, deletedTask);
  }
}
