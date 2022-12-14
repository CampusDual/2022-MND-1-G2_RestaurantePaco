import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Menus } from "../model/menus";
import { AnyPageFilter } from "../model/rest/filter";
import { DataSourceRESTResponse } from "../model/rest/response";
import { API_CONFIG } from "../shared/api.config";
import { Buffer } from 'buffer';
import { CreateMenusRequest, EditMenusRequest } from "../model/rest/request";

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

  public getMenu(id: number): Observable<Menus> {
    const url = API_CONFIG.getMenu;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Menus>(url, { params, headers });
  }

  public createMenus(menus: Menus): Observable<any> {
    const url = API_CONFIG.createMenus;
    const body: CreateMenusRequest = new CreateMenusRequest(menus);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<Menus>(url, body, { headers }).pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }

  public editMenus(menus: Menus): Observable<any> {
    const url = API_CONFIG.editMenus;
    const body: EditMenusRequest = new EditMenusRequest(menus);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(() => e);
      })
    );
  }

  public deleteMenus(idMenu: number): Observable<any> {
    const url = API_CONFIG.deleteMenus;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('id', idMenu.toString());
    return this.http.delete<any>(url, { params, headers });
  }
}
