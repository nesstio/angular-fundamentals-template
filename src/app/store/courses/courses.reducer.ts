import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from '@app/store/courses/courses.actions';

// Add your code here
export const coursesFeatureKey = 'courses';


export interface CoursesState {
    // Add your code here
    allCourses: any[];            
    course: any | null;           
    isAllCoursesLoading: boolean; 
    isSingleCourseLoading: boolean; 
    isSearchState: boolean;       
    errorMessage: string | null;  
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,

  // --- All courses ---
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  // --- Single course ---
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  // --- Filtered courses ---
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    isSearchState: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    isSearchState: true,
    errorMessage: error,
  })),

  // --- Delete course ---
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  // --- Edit course ---
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    errorMessage: null,
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  // --- Create course ---
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    errorMessage: null,
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);


export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
