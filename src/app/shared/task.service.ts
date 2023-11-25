import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Task } from '../models/listask.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  addTask(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/task', data);
  }

  getTaskList():Observable<any>{
    return this._http.get('http://localhost:3000/task');
  }

  deleteTask(id:number):Observable<any>{
    return this._http.delete(`http://localhost:3000/task/${id}`);
  }

  




  


  getTasks():Observable<any>{
    return this._http.get('http://localhost:8040/projects');
  }
  

  

  getProjectsByStatus(status?: string): Observable<any> {
    const url = status ? `http://localhost:8040/projects/bystatus/${status}` : 'http://localhost:8040/projects';
    return this._http.get(url);
  }
  
  
  addTask2(data:any): Observable<any>{
    return this._http.post('http://localhost:8040/projects', data);
  }

    deleteTask2(id:number):Observable<any>{
      return this._http.delete(`http://localhost:8040/projects/${id}`);
    }
    
    updateTasks(updatedTask: Task): Observable<any> {
      const id = updatedTask.id;
      return this._http.put(`http://localhost:8040/projects/${id}`, updatedTask);
    }
    

  
}
