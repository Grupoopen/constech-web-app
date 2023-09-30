import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";




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
    return this._http.get('http://localhost:3000/lista');
  }
  
  /* getOneTask(_id:any){
    return TaskList.find(task => task.id === _id)

    
  } */

  addTask2(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/lista', data);
  }
/* 
  editTask(newTaskEdit:any){
    const index=TaskList.findIndex(task=>task.id ===newTaskEdit.id)

    TaskList[index]=newTaskEdit;
  }
 */

    deleteTask2(id:number):Observable<any>{
      return this._http.delete(`http://localhost:3000/lista/${id}`);
    }

  
}
