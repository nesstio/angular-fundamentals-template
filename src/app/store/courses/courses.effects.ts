import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '@app/services/courses.service';
import * as CoursesActions from '@app/store/courses/courses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStateFacade: any,
        private router: Router
    ) {}

    // Add your code here
    getAll$ = createEffect(() =>
        this.actions$.pipe(
        ofType(CoursesActions.requestAllCourses),
        mergeMap(() =>
            this.coursesService.getAll().pipe(
            map((courses) =>
                CoursesActions.requestAllCoursesSuccess({ courses })
            ),
            catchError((error) =>
                of(CoursesActions.requestAllCoursesFail({ error: error.message }))
            )
            )
        )
        )
    );
    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            mergeMap(({ title }) =>
            this.coursesStateFacade.allCourses$.pipe(
                map((courses: any[]) => {
                const filtered = courses.filter((course: any) =>
                    course.title.toLowerCase().includes(title.toLowerCase())
                );
                return CoursesActions.requestFilteredCoursesSuccess({ courses: filtered });
                })
            )
            )
        )
        );
    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap(({ id }) =>
                // this.coursesService.getSpecificCourse(id)
                this.coursesService.getCourse(id).pipe(
                    map((course) =>
                    CoursesActions.requestSingleCourseSuccess({ course })
                    ),
                    catchError((error) =>
                    of(CoursesActions.requestSingleCourseFail({ error: error.message }))
                    )
                )
                )
            )
    );
    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap(({ id, course }) =>
            this.coursesService.editCourse(id, course).pipe(
                map((updatedCourse) =>
                CoursesActions.requestEditCourseSuccess({ course: updatedCourse })
                ),
                catchError((error) =>
                of(CoursesActions.requestEditCourseFail({ error: error.message }))
                )
            )
            )
        )
    );
    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap(({ course }) =>
            this.coursesService.createCourse(course).pipe(
                map((createdCourse) =>
                CoursesActions.requestCreateCourseSuccess({ course: createdCourse })
                ),
                catchError((error) =>
                of(CoursesActions.requestCreateCourseFail({ error: error.message }))
                )
            )
            )
        )
    );
    redirectToTheCoursesPage$ = createEffect(
    () =>
        this.actions$.pipe(
        ofType(
            CoursesActions.requestCreateCourseSuccess,
            CoursesActions.requestEditCourseSuccess,
            CoursesActions.requestSingleCourseFail
        ),
        map(() => {
            this.router.navigate(['/courses']);
        })
        ),
    { dispatch: false }
    );
    
}
