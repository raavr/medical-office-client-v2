import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContainerComponent } from './sidenav-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SidenavContainerComponent', () => {
  let component: SidenavContainerComponent;
  let fixture: ComponentFixture<SidenavContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavContainerComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render a router-outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeDefined();
  });
  
  it('should render app-footer', () => {
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(footer).toBeDefined();
  });
  
  it('should render two app-nav-item components if loggedIn equals true', () => {
    component.loggedIn = true;
    fixture.detectChanges();
    const navItems = fixture.nativeElement.querySelectorAll('app-nav-item');
    expect(navItems.length).toEqual(2);
  });
  
  it('should render one app-nav-item components if loggedIn equals false', () => {
    component.loggedIn = false;
    fixture.detectChanges();
    const navItems = fixture.nativeElement.querySelectorAll('app-nav-item');
    expect(navItems.length).toEqual(1);
    expect(navItems[0].textContent.trim()).toEqual('Strona główna');
  });
  
});
