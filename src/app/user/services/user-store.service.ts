import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { map, tap } from 'rxjs';

interface SwaggerAuthor { name: string }

@Injectable({
    providedIn: 'root'
})

export class UserStoreService {
    private name$$ = new BehaviorSubject<string | null>(null);
    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    private authors$$ = new BehaviorSubject<any[]>([]);

    name$ = this.name$$.asObservable();
    isAdmin$ = this.isAdmin$$.asObservable();
    authors$ = this.authors$$.asObservable();

    constructor(private userService: UserService){}

    getUser(): Observable<void> {
        // Add your code here
        return this.userService.getUser().pipe(
            tap((res: any)=>{
                const result = res?.result ?? res;
                const name = result?.name ?? null;
                const isAdmin = (result?.role ?? "") === "admin";

                this.name$$.next(name);
                this.isAdmin$$.next(isAdmin);

            }),
            map(()=>void 0)
        );
    }
    loadAuthors() {
        return this.userService.getAllAuthors().pipe(
        tap((res: any) => {
            const result = res?.result ?? res;
            const authors = Array.isArray(result) ? result : [];
            this.authors$$.next(authors);
        }),
        map(() => void 0)
        );
    }

    get isAdmin() {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }
}
