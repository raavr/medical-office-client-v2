import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromAuth from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import { SignupComponent } from './signup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { StoreModule, combineReducers } from '@ngrx/store';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      declarations: [
        SignupComponent,
      ],
      providers: [
        {
          provide: AlertFactoryService,
          useValue: { create: () => {} }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
