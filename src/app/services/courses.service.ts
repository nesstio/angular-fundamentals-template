import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private readonly api = 'http://localhost:4000'; 

  constructor(private http: HttpClient) {}

  /** GET /courses/all */
  getAll(): Observable<any> {
    return this.http
      .get<{ successful: boolean; result: any[] }>(`${this.api}/courses/all`)
      .pipe(
        map(res => res.result) 
      );
  }

  /** POST /courses/add */
  createCourse(course: any): Observable<any> { // заменить any на свой интерфейс Course????
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

  /** GET /courses/filter?title=...   */
  // filterCourses(value: string): Observable<any> {
  //   const params = new HttpParams().set('title', value);
  //   return this.http
  //     .get<{ successful: boolean; result: any[] }>(`${this.api}/courses/filter`, { params })
  //     .pipe(
  //       map(res => res.result) 
  //     );
  // }
  //#1
  filterCourses(value: string): Observable<any[]> {
  const params = new HttpParams({ fromObject: { title: [value] } });

    return this.http
      .get<{ successful: boolean; result: any[] }>('/courses/filter', { params })
      .pipe(map(res => res.result));
}


  // ------- Authors -------

  /** GET /authors/all */
  getAllAuthors(): Observable<any> {
    return this.http.get(`${this.api}/authors/all`);
  }

  /** POST /authors/add  */
  createAuthor(name: string): Observable<any> {
    return this.http.post(`${this.api}/authors/add`, { name });
  }

  /** GET /authors/{id} */
  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.api}/authors/${id}`);
  }
}
