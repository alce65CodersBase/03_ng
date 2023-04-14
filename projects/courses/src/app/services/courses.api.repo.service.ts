import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { ApiRepo } from './repo.interface';
import { Course } from '../../models/courses';
import { environment } from '../../environments/environment';

export type ApiResponse = {
  results: Course[];
  // El endpoint devuelve {results: []}
};

@Injectable({
  providedIn: 'root',
})
export class CoursesApiRepoService implements ApiRepo<Course> {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrlBase + '/courses';
  }

  loadItems(): Observable<Course[]> {
    return this.http
      .get<ApiResponse>(this.url)
      .pipe(map((data) => data.results))
      .pipe(catchError(this.handleError));
  }

  getItem(id: Course['id']): Observable<Course> {
    const url = this.url + '/' + id;
    return this.http
      .get<ApiResponse>(url)
      .pipe(map((data) => data.results[0]))
      .pipe(catchError(this.handleError));
  }

  createItem(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http
      .post<ApiResponse>(this.url, course)
      .pipe(map((data) => data.results[0]))
      .pipe(catchError(this.handleError));
  }

  updateItem(course: Partial<Course>): Observable<Course> {
    const url = this.url + '/' + course.id;
    return this.http
      .patch<ApiResponse>(url, course)
      .pipe(map((data) => data.results[0]))
      .pipe(catchError(this.handleError));
  }

  deleteItem(id: Course['id']): Observable<void> {
    const url = this.url + '/' + id;
    return this.http
      .delete<ApiResponse>(url)
      .pipe(map(() => undefined))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
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
