import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  basePath = 'https://fake-api-freeplace.herokuapp.com/history';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  create(item: any): Observable<History> {
    return this.http.post<History>(
        this.basePath,
        JSON.stringify(item),
        this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError));
  }

  getById(id: any): Observable<History> {
    return this.http.get<History>(
        `${this.basePath}/${id}`,
        this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError));
  }

  getAll(): Observable<History> {
    return this.http.get<History>(this.basePath, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
}
