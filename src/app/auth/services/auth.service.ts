import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, finalize, catchError, map } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';

const API_URL = 'http://localhost:4000';

interface LoginPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  name?: string;
  email: string;
  password: string;
}
interface LoginResponse {
  result: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthorized$$ = new BehaviorSubject<boolean>(!!this.session.getToken());
    public  isAuthorized$  = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        private session: SessionStorageService
    ) {}

        // POST /auth/login
    login(user: LoginPayload): Observable<void> {
        return this.http.post<LoginResponse>(`${API_URL}/login`, user).pipe(
            tap(res => {
                const token = res.result.replace(/^Bearer\s+/i,'').trim();
                this.session.setToken(token);
                this.isAuthorized$$.next(true);
            }),
            tap(() => this.router.navigate(['/courses'])),
            map(() => void 0)
        );
    }


        // DELETE /auth/logout 
    logout(): Observable<void> {
        return this.http.delete<void>(`${API_URL}/logout`, {}).pipe(
        
        catchError(() => of(void 0)),
        finalize(() => {
            this.session.deleteToken();
            this.isAuthorized$$.next(false);
            this.router.navigate([this.getLoginUrl()]);
        })
        );
    }

        // POST /auth/register 
    register(user: RegisterPayload): Observable<void> {
        return this.http.post<void>(`${API_URL}/register`, user).pipe(
        tap(() => this.router.navigate([this.getLoginUrl()])),
        map(() => void 0)
        );
    }

    get isAuthorised() {
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl(): string {
        return '/login';
    }
}
