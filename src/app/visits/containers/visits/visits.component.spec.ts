import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { VisitsComponent } from './visits.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromRoot from '../../../core/reducers';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromVisits from '../../reducers';

describe('VisitsComponent', () => {
  let component: VisitsComponent;
  let fixture: ComponentFixture<VisitsComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          visits: combineReducers(fromVisits.reducers)
        })
      ],
      declarations: [VisitsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <router-outlet> element', () => {
    const router = hostElement.querySelector('router-outlet');
    expect(router).not.toBeNull();
  });

  it('should render two links with specific labels', () => {
    const links = hostElement.querySelectorAll('a');
    fixture.detectChanges();

    expect(links.length).toBe(2);
    expect(links[0].textContent.trim()).toEqual('Aktualne');
    expect(links[1].textContent.trim()).toEqual('Historyczne');
  });

  it('should render h2', () => {
    const h2 = hostElement.querySelector('h2');
    fixture.detectChanges();

    expect(h2.textContent).toEqual('Moje wizyty');
  });
});
