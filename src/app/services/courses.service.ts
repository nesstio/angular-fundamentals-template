import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private readonly api = ''; 

  constructor(private http: HttpClient) {}

  /** GET /courses/all */
  getAll(): Observable<any> {
    return this.http.get(`${this.api}/courses/all`);
  }

  /** POST /courses/add */
  createCourse(course: any): Observable<any> { // заменишь any на свой интерфейс Course
    return this.http.post(`${this.api}/courses/add`, course);
  }

  /** PUT /courses/{id} */
  editCourse(id: string, course: any): Observable<any> {
    return this.http.put(`${this.api}/courses/${id}`, course);
  }

  /** GET /courses/{id} */
  getCourse(id: string): Observable<any> {
    return this.http.get(`${this.api}/courses/${id}`);
  }

  /** DELETE /courses/{id} */
  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.api}/courses/${id}`);
  }

  /** GET /courses/filter?title=...  (если на бэке другой ключ, замени 'title') */
  filterCourses(value: string): Observable<any> {
    const params = new HttpParams().set('title', value);
    return this.http.get(`${this.api}/courses/filter`, { params });
  }

  // ------- Authors -------

  /** GET /authors/all */
  getAllAuthors(): Observable<any> {
    return this.http.get(`${this.api}/authors/all`);
  }

  /** POST /authors/add  (тело обычно { name }) */
  createAuthor(name: string): Observable<any> {
    return this.http.post(`${this.api}/authors/add`, { name });
  }

  /** GET /authors/{id} */
  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.api}/authors/${id}`);
  }
}
