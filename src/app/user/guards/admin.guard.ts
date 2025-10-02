import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of, switchMap, take, map, catchError } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate{
    // Add your code here
    constructor(private userStore: UserStoreService, private router: Router) {}

    canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {

        return this.userStore.getUser().pipe(
            switchMap(() => this.userStore.isAdmin$.pipe(take(1))),
            map(isAdmin => (isAdmin ? true : this.router.createUrlTree(['/courses']))),
            catchError(() => of(this.router.createUrlTree(['/courses'])))
            );
    }
}
