import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event if the button was clicked', () => {
    spyOn(component.openSidenav, 'emit');
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    
    button.click();
    expect(component.openSidenav.emit).toHaveBeenCalled();
  });

  it('should render the mat-toolbar component', () => {
    const compiled = fixture.debugElement.nativeElement;
    
    expect(compiled.querySelector('mat-toolbar')).not.toBeNull();
  });
});
