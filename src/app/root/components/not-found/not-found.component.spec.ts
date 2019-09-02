import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render h2 element containing text "404. Nie znaleziono"', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent.trim()).toEqual('404. Nie znaleziono');
  });

  it('should render p element containing text "Ooops! Nic tu nie ma..."', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent.trim()).toEqual('Ooops! Nic tu nie ma...');
  });

  it('should render button element containing text "Strona główna"', () => {
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.textContent.trim()).toEqual('Strona główna');
  });
});
