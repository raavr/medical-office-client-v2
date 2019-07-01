import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorActionComponent } from './doctor-action.component';
import { VisitStatus } from '../../models/visit';

describe('DoctorActionComponent', () => {
  let component: DoctorActionComponent;
  let fixture: ComponentFixture<DoctorActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render div with class visits__actions', () => {
    const divEl = fixture.nativeElement.querySelector('div');
    expect(divEl.getAttribute('class')).toEqual('visits__actions');
  });

  it('should render two buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent.trim()).toBe('Zaakceptuj wizyty');
    expect(buttons[1].textContent.trim()).toBe('Odwołaj wizyty');
  });

  it('should buttons be disabled if anyRowHasValue input is equal false', () => {
    component.anyRowHasValue = false;
    fixture.detectChanges();
    const buttons: HTMLElement[] = fixture.nativeElement.querySelectorAll('button');

    expect(buttons[0].getAttribute('disabled')).not.toBeNull();
    expect(buttons[1].getAttribute('disabled')).not.toBeNull();
  });

  it('should buttons be enabled if anyRowHasValue input is equal true', () => {
    component.anyRowHasValue = true;
    fixture.detectChanges();
    const buttons: HTMLElement[] = fixture.nativeElement.querySelectorAll('button');
    
    expect(buttons[0].getAttribute('disabled')).toBeNull();
    expect(buttons[1].getAttribute('disabled')).toBeNull();
  });

  it('should not call modifyVisitsStatus.emit when the button is clicked', () => {
    component.anyRowHasValue = false;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    spyOn(component.modifyVisitsStatus, 'emit');
    
    expect(component.modifyVisitsStatus.emit).not.toHaveBeenCalled();
    button.click();
    expect(component.modifyVisitsStatus.emit).not.toHaveBeenCalled();
  });

  it('should call modifyVisitsStatus.emit with the specific value when the first button is clicked', () => {
    component.anyRowHasValue = true;
    fixture.detectChanges();
    const firstButton = fixture.nativeElement.querySelectorAll('button')[0];
    spyOn(component.modifyVisitsStatus, 'emit');
    
    expect(component.modifyVisitsStatus.emit).not.toHaveBeenCalled();
    firstButton.click();
    expect(component.modifyVisitsStatus.emit).toHaveBeenCalledWith(VisitStatus.ACCEPTED);
  });

  it('should call modifyVisitsStatus.emit with the specific value when the second button is clicked', () => {
    component.anyRowHasValue = true;
    fixture.detectChanges();
    const secondButton = fixture.nativeElement.querySelectorAll('button')[1];
    spyOn(component.modifyVisitsStatus, 'emit');
    
    expect(component.modifyVisitsStatus.emit).not.toHaveBeenCalled();
    secondButton.click();
    expect(component.modifyVisitsStatus.emit).toHaveBeenCalledWith(VisitStatus.CANCELED);
  });
});
