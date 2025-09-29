import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap, finalize } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  // ----- state -----
  private courses$$ = new BehaviorSubject<any[]>([]);
  private authors$$ = new BehaviorSubject<any[]>([]);
  private isLoading$$ = new BehaviorSubject<boolean>(false); 
  // ----- selectors -----
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();       
  constructor(private api: CoursesService) {}

  private setLoading(v: boolean) { this.isLoading$$.next(v); } 

  // ===== Courses =====

  /** GET /courses/all */
  getAll(): Observable<any> {
    this.setLoading(true);
    return this.api.getAll().pipe(
      tap(list => this.courses$$.next(list)),
      finalize(() => this.setLoading(false))
    );
  }

  /** POST /courses/add */
  createCourse(course: any): Observable<any> {
    this.setLoading(true);
    return this.api.createCourse(course).pipe(
      switchMap(() => this.api.getAll()),
      tap(list => this.courses$$.next(list)),
      finalize(() => this.setLoading(false))
    );
  }

  /** PUT /courses/{id} */
  editCourse(id: string, course: any): Observable<any> {
    this.setLoading(true);
    return this.api.editCourse(id, course).pipe(
      switchMap(() => this.api.getAll()),
      tap(list => this.courses$$.next(list)),
      finalize(() => this.setLoading(false))
    );
  }

  /** GET /courses/{id} */
  getCourse(id: string): Observable<any> {
    this.setLoading(true);
    return this.api.getCourse(id).pipe(
      finalize(() => this.setLoading(false))
    );
  }

  /** DELETE /courses/{id} */
  deleteCourse(id: string): Observable<any> {
    this.setLoading(true);
    return this.api.deleteCourse(id).pipe(
      switchMap(() => this.api.getAll()),
      tap(list => this.courses$$.next(list)),
      finalize(() => this.setLoading(false))
    );
  }

  /** GET /courses/filter?title=... */
  filterCourses(value: string): Observable<any> {
    this.setLoading(true);
    return this.api.filterCourses(value).pipe(
      tap(list => this.courses$$.next(list)),
      finalize(() => this.setLoading(false))
    );
  }

  // ===== Authors =====

  /** GET /authors/all */
  getAllAuthors(): Observable<any> {
    this.setLoading(true);
    return this.api.getAllAuthors().pipe(
      tap(list => this.authors$$.next(list)),
      finalize(() => this.setLoading(false))
    );
  }

  /** POST /authors/add */
  createAuthor(name: string): Observable<any> {
    this.setLoading(true);
    return this.api.createAuthor(name).pipe(
      switchMap(() => this.api.getAllAuthors()),
      tap(list => this.authors$$.next(list)),
      finalize(() => this.setLoading(false))
    );
  }

  /** GET /authors/{id}  */
  getAuthorById(id: string): Observable<any> {
    this.setLoading(true);
    return this.api.getAuthorById(id).pipe(
      finalize(() => this.setLoading(false))
    );
  }
}

