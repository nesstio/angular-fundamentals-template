import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly api = 'http://localhost:4000';

    constructor(private http: HttpClient) {}

    getUser() {
        // Add your code here
        return this.http.get(`${this.api}/users/me`);
    }
    getAllAuthors() {
        return this.http.get(`${this.api}/authors/all`);
    }
}
