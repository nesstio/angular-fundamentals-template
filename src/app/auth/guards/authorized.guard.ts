import { Injectable } from '@angular/core';

import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    // Add your code here
    constructor(private auth: AuthService, private router: Router) {}

  canLoad(_route: Route, _segments: UrlSegment[]): boolean | UrlTree {
    return this.auth.isAuthorised ? true : this.router.createUrlTree(['/login']);
  }
}
