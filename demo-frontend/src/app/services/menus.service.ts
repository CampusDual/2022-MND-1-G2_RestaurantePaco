import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Menus } from "../model/menus";
import { AnyPageFilter } from "../model/rest/filter";
import { DataSourceRESTResponse } from "../model/rest/response";
import { API_CONFIG } from "../shared/api.config";
import { Buffer } from 'buffer';

@Injectable({
    providedIn: 'root'
  })
  export class MenusService {
  
    constructor(private http: HttpClient) { }
  
    public getMenus(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Menus[]>> {
      const url = API_CONFIG.getMenus;
      const headers = new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        // Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
        Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
      });
      return this.http.post<DataSourceRESTResponse<Menus[]>>(url, pageFilter, { headers });
    }
  }