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

  getAllToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.baseApiUrl + '/api/ToDo');
  }
}
