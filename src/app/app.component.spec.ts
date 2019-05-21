import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromNavbar from './navbar/reducers';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          navbar: combineReducers(fromNavbar.reducers),
        }),
      ],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
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
});
