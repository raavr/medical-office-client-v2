import * as AuthActions from 'src/app/auth/actions/auth.actions';
import { Action } from '@ngrx/store';
import { Observable, Subscription, combineLatest, fromEvent } from 'rxjs';
import { map, finalize, shareReplay, startWith } from 'rxjs/operators';
import * as isEqual from 'fast-deep-equal';

export function withUnauthorizeErrorAction(
  actions: Array<Action>,
  errorStatus: number
): Array<Action> {
  return errorStatus === 401 ? [...actions, new AuthActions.Logout()] : actions;
}

//based on https://netbasal.com/detect-unsaved-changes-in-angular-forms-75fd8f5f1fa6
export function dirtyCheck<U>(source: Observable<U>) {
  let subscription: Subscription;
  let isDirty = false;

  return function<T>(valueChanges: Observable<T>): Observable<boolean> {
    const isDirty$ = combineLatest(source, valueChanges).pipe(
      map(
        ([store, changes]) =>
          (isDirty = !!changes && isEqual(store, changes) === false)
      ),
      finalize(() => subscription.unsubscribe()),
      startWith(false),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    subscription = fromEvent(window, 'beforeunload').subscribe(event => {
      isDirty && (event.returnValue = false);
    });

    return isDirty$;
  };
}

export function isUnprotectedRouteFn(paths: string[]): Function {
  const unprotectedRoutes = paths
    .map(path => path.split('/')[0])
    .reduce(
      (uniquePaths, currPath) => uniquePaths.add(currPath),
      new Set<string>()
    );

  return (path: string) => unprotectedRoutes.has(path);
}
