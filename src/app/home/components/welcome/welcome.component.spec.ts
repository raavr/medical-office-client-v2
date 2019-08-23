import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Witaj,  John Doe"', () => {
    component.authUser = { id: '1', name: 'John', surname: 'Doe' };
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.home__title');
    expect(text.textContent.trim()).toEqual('Witaj,  John Doe');
  });

  it('should the title has a class home__title--highlight', () => {
    component.authUser = { id: '1', name: 'John', surname: 'Doe' };
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.home__title');
    const textHighlight = text.querySelector('.home__title--highlight');
    expect(textHighlight).not.toBeNull();
  });

  it('should display "Witaj, ..."', () => {
    component.authUser = null;
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.home__title');
    expect(text.textContent.trim()).toEqual('Witaj, ...');
  });

  it('should display "Masz 0 nieprzeczytanych powiadomień"', () => {
    component.notificationCounter = 0;
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.home__subtitle');
    expect(text.textContent.trim()).toEqual('Masz 0 nieprzeczytanych powiadomień');
  });

  it('should display "Masz 1 nieprzeczytane powiadomienie"', () => {
    component.notificationCounter = 1;
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.home__subtitle');
    expect(text.textContent.trim()).toEqual('Masz 1 nieprzeczytane powiadomienie');
  });
  
  it('should display "Masz 2 nieprzeczytane powiadomienia"', () => {
    component.notificationCounter = 2;
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.home__subtitle');
    expect(text.textContent.trim()).toEqual('Masz 2 nieprzeczytane powiadomienia');
  });

  it('should display "Masz 7 nieprzeczytanych powiadomień"', () => {
    component.notificationCounter = 7;
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.home__subtitle');
    expect(text.textContent.trim()).toEqual('Masz 7 nieprzeczytanych powiadomień');
  });

  it('should the subtitle has a class home__title--highlight', () => {
    component.notificationCounter = 7;
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.home__subtitle');
    const textHighlight = text.querySelector('.home__title--highlight');
    expect(textHighlight).not.toBeNull();
  });
});
