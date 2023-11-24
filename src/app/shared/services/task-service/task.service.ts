import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Task } from '../../../models/listask.module';
import { Assignment} from "../../../models/Task";

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlApi='http://localhost:8040/tasks'

  constructor(private _http: HttpClient) { }

  public addTask(data: any): Observable<any> {
    return this._http.post<any>(this.urlApi, data, {headers: headers})
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud POST:', error);
          return throwError(error);
        })
      );
  }

  public updateTask(id: number, data: any): Observable<any> {
    const url = `${this.urlApi}/${id}`;
    return this._http.put<any>(url, data);
  }
  public getTaskList():Observable<any>{
    return this._http.get<any>(this.urlApi);
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.urlApi}/${id}`;
    return this._http.delete<any>(url);
  }

  public getTaskByTitle(title: string): Observable<Assignment[]> {
    const url = `${this.urlApi}/title/${title}`;
    return this._http.get<Assignment[]>(url).pipe(
      catchError((error) => {
        console.error(`Error al obtener la tarea por título ${title}:`, error);
        return throwError(error);
      })
    );
  }

  public getTaskByAssigned(assigned: string): Observable<Assignment> {
    const url = `${this.urlApi}/assigned/${assigned}`;
    return this._http.get<Assignment>(url).pipe(
      catchError((error) => {
        console.error(`Error al obtener la tarea por assignado ${assigned}:`, error);
        return throwError(error);
      })
    );
  }







  getTasks():Observable<any>{
    return this._http.get('https://655e13e09f1e1093c59a7b50.mockapi.io/api/v1/CONSTECH');
  }


  addTask2(data:any): Observable<any>{
    return this._http.post('https://655e13e09f1e1093c59a7b50.mockapi.io/api/v1/CONSTECH', data);
  }

    deleteTask2(id:number):Observable<any>{
      return this._http.delete(`https://655e13e09f1e1093c59a7b50.mockapi.io/api/v1/CONSTECH/${id}`);
    }

    updateTasks(updatedTask: Task): Observable<any> {
      const id = updatedTask.id;
      return this._http.put(`https://655e13e09f1e1093c59a7b50.mockapi.io/api/v1/CONSTECH/${id}`, updatedTask);
    }



}
