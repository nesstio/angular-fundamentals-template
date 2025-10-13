import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from '@app/store/courses/courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: any[];
  course: any | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

/** ----------const---------- */
type Patch = Partial<CoursesState>;

const CLEAR_ERROR: Patch = { errorMessage: null };

const ALL_LOADING_ON: Patch = { isAllCoursesLoading: true };
const ALL_LOADING_OFF: Patch = { isAllCoursesLoading: false };

const SINGLE_LOADING_ON: Patch = { isSingleCourseLoading: true };
const SINGLE_LOADING_OFF: Patch = { isSingleCourseLoading: false };

const SEARCH_ON: Patch = { isSearchState: true };
const SEARCH_OFF: Patch = { isSearchState: false };

/** ---------------------------------------------------- */

export const coursesReducer = createReducer(
  initialState,

  // --- All courses ---
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    ...ALL_LOADING_ON,
    ...SEARCH_OFF,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    ...ALL_LOADING_OFF,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    ...ALL_LOADING_OFF,
    errorMessage: error,
  })),

  // --- Single course ---
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    ...SINGLE_LOADING_ON,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    ...SINGLE_LOADING_OFF,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    ...SINGLE_LOADING_OFF,
    errorMessage: error,
  })),

  // --- Filtered courses ---
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    ...ALL_LOADING_ON,
    ...SEARCH_ON,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    ...ALL_LOADING_OFF,
    ...SEARCH_ON,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    ...ALL_LOADING_OFF,
    ...SEARCH_ON,
    errorMessage: error,
  })),

  // --- Delete course ---
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  // --- Edit course ---
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  // --- Create course ---
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    ...CLEAR_ERROR,
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);

export const reducer = (state: CoursesState | undefined, action: Action): CoursesState =>
  coursesReducer(state ?? initialState, action);