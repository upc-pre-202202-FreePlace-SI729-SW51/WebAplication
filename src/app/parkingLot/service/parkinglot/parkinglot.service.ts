import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Parkinglot} from "../../model/parkinglot";

@Injectable({
  providedIn: 'root'
})
export class ParkinglotService {

  basePath = ' http://localhost:3000/api/v1/parkings';

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

  create(item: any): Observable<Parkinglot> {
    return this.http.post<Parkinglot>(
        this.basePath,
        JSON.stringify(item),
        this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError));
  }

  getById(id: any): Observable<Parkinglot> {
    return this.http.get<Parkinglot>(
        `${this.basePath}/${id}`,
        this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError));
  }

  getAll(): Observable<Parkinglot> {
    return this.http.get<Parkinglot>(this.basePath, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  update(id: any, item: any): Observable<Parkinglot> {
    return this.http.put<Parkinglot>(`${this.basePath}/${id}`,
        JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
}
