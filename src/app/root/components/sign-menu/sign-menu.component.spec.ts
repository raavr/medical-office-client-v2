import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignMenuComponent } from './sign-menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SignMenuComponent', () => {
  let component: SignMenuComponent;
  let fixture: ComponentFixture<SignMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignMenuComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two buttons if loggedIn equals false', () => {
    component.loggedIn = false;
    fixture.detectChanges();
    const btns = fixture.nativeElement.querySelectorAll('button');
    expect(btns.length).toEqual(2);
  });

  it('shouldn\'t render buttons if loggedIn equals true', () => {
    component.loggedIn = true;
    fixture.detectChanges();
    const btns = fixture.nativeElement.querySelectorAll('button');
    expect(btns.length).toEqual(0);
  });
});
