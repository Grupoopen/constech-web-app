import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http: HttpClient) { }

  addCompany(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/companies', data);
  }

  getCompanyList():Observable<any>{
    return this._http.get('http://localhost:3000/companies');
  }

  deleteCompany(id:number):Observable<any>{
    return this._http.delete(`http://localhost:3000/companies/${id}`);
  }



  getCompany():Observable<any>{
    return this._http.get('http://localhost:3000/lista');
  }


  addCompany2(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/lista', data);
  }


    deleteCompany2(id:number):Observable<any>{
      return this._http.delete(`http://localhost:3000/lista/${id}`);
    }

  
}
