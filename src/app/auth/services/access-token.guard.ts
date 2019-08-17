import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, iif } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as fromRoot from '../../core/reducers';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as AuthActions from '../actions/auth.actions';
import { isUnprotectedRoute } from '../auth.routes';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private jwtHelper: JwtHelperService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  private canActivateTokenExpired(path: string): boolean {
    //access token expired and the route path doesn't require authentication so let me into it => canActivate returns true
    if (isUnprotectedRoute(path)) {
      return true;
    }

    //access token expired and the route path requires authentication so redirect me to the /login => canActivate returns false
    this.store.dispatch(new AuthActions.LoginRedirect());
    return false;
  }

  private canActivateTokenValid(path: string, token: string): boolean {
    //access token is valid and the route path doesn't require authentication so redirect me to the main path "/" => canActivate returns false
    if (isUnprotectedRoute(path)) {
      this.router.navigate(['/']);
      return false;
    }

    //access token is valid and the route path requires authentication so let me into it => canActivate returns true
    this.store.dispatch(new AuthActions.TokenValid({ token }));
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const path = route.url[0] && route.url[0].path;
    return of(this.tokenService.getToken()).pipe(
      mergeMap(token =>
        iif(
          () => this.jwtHelper.isTokenExpired(token),
          of(path).pipe(map(() => this.canActivateTokenExpired(path))),
          of(path).pipe(map(() => this.canActivateTokenValid(path, token)))
        )
      )
    );
  }
}
