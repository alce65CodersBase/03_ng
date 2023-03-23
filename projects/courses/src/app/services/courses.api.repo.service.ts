import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { ApiRepo } from './repo.interface';
import { Course } from '../../models/courses';

type ErrorInfo = string;

@Injectable({
  providedIn: 'root',
})
export class CoursesApiRepoService implements ApiRepo<Course, ErrorInfo> {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/courses';
    // El endpoint devuelve ...
  }

  loadItems(): Observable<Course[] | string> {
    return this.http.get<Course[]>(this.url).pipe(catchError(this.handleError));
  }

  getItem(id: Course['id']) {
    const url = this.url + '/' + id;
    return this.http.get<Course>(url).pipe(catchError(this.handleError));
  }

  createItem(course: Omit<Course, 'id'>) {
    return this.http
      .post<Course>(this.url, course)
      .pipe(catchError(this.handleError));
  }

  updateItem(course: Partial<Course>) {
    const url = this.url + '/' + course.id;
    return this.http
      .patch<Course>(url, course)
      .pipe(catchError(this.handleError));
  }

  deleteItem(id: Course['id']) {
    const url = this.url + '/' + id;
    return this.http.delete<object>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<string> {
    let message = '';
    if (error.status === 0) {
      // A client-side or network error ocurred.
      message = error.message;
      console.error('An error occurred:', message);
    } else {
      // The API returned a unsuccessful response code.
      // The response body may contain clues as to what went wrong

      message = `Error ${error.status}: ${error.error}`;
      console.error('Error Status: ', error.status);
      console.error('Error details: ', error.error);
    }
    // return an observable with a user-facing error message
    return throwError(() => `Something bad happened; ${message}`);
  }
}
