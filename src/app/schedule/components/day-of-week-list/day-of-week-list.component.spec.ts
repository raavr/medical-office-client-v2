import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekListComponent } from './day-of-week-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DayOfWeekListComponent', () => {
  let component: DayOfWeekListComponent;
  let fixture: ComponentFixture<DayOfWeekListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOfWeekListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call initChangesCheck when ngOnInit method is called", () => {
    spyOn(component.initChangesCheck, "emit");
    expect(component.initChangesCheck.emit).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(component.initChangesCheck.emit).toHaveBeenCalledWith(
      component.weeklyTimesChanges$
    );
  });

  it("should call weeklyTimesChanges$ when oneOfWeeklyTimesChanged method is called", () => {
    spyOn(component.weeklyTimesChanges$, "next");
    expect(component.weeklyTimesChanges$.next).not.toHaveBeenCalled();
    component.oneOfWeeklyTimesChanged();
    expect(component.weeklyTimesChanges$.next).toHaveBeenCalledWith(
      component._weeklyTimes
    );
  });

  describe("with hostElement", () => {
    let host: HTMLElement;

    beforeEach(() => {
      host = fixture.nativeElement;
    });

    it('should render mat-card-title with the title equals "Ustal godziny wizyt dla dni tygodnia"', () => {
      const title = host.querySelector("mat-card-title");
      expect(title.textContent.trim()).toEqual("Ustal godziny wizyt dla dni tygodnia");
    });

    it("should display mat-icon when there are unsaved changes", () => {
      let matIcon = host.querySelectorAll("mat-icon")[1];
      expect(matIcon).toBeUndefined();
      component.unsavedChanges = true;
      fixture.detectChanges();
      matIcon = host.querySelectorAll("mat-icon")[1];
      expect(matIcon).not.toBeNull();
    });

    it("should dispay app-loading-spinner if pending property equals true", () => {
      let loading = host.querySelector("app-loading-spinner");
      expect(loading).toBeNull();
      component.pending = true;
      fixture.detectChanges();
      loading = host.querySelector("app-loading-spinner");
      expect(loading).not.toBeNull();
    });

    it("should emit disabledDates object when save btn is clicked", () => {
      const button = host.querySelector(".card-button") as HTMLElement;
      spyOn(component.update, "emit");
      expect(component.update.emit).not.toHaveBeenCalled();
      button.click();
      expect(component.update.emit).toHaveBeenCalledWith(
        component._weeklyTimes
      );
    });
  });
});
