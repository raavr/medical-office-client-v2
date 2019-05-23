import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromNavbar from './navbar/reducers';
import * as fromRoot from './core/reducers';
import * as fromAuth from './auth/reducers';
import { Logout, AutoLogin } from './auth/actions/auth.actions';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          navbar: combineReducers(fromNavbar.reducers),
          media: combineReducers(fromRoot.reducers),
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.get(Store);
    
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a router-outlet', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeDefined();
  });

  it('should dispatch an AutoLogin action on init', () => {
    expect(store.dispatch).not.toHaveBeenCalled();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(new AutoLogin());
  });
});
