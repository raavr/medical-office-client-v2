import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VisitTimeComponent } from "./visit-time.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("VisitTimeComponent", () => {
  let component: VisitTimeComponent;
  let fixture: ComponentFixture<VisitTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisitTimeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should add form control value to the visitTimesSet", () => {
    spyOn(component.visitTimesSet, "add").and.callThrough();
    expect(component.visitTimesSet.add).not.toHaveBeenCalled();
    component.addTime();
    expect(component.visitTimesSet.add).toHaveBeenCalledWith("08:00");
    expect(Array.from(component.visitTimesSet)).toEqual(["08:00"]);
  });

  it("should add form control value to the times array", () => {
    component.times = ["10:00"];
    component.visitTimesSet.add("10:00");
    fixture.detectChanges();
    expect(component.times).toEqual(["10:00"]);
    component.addTime();
    expect(component.times).toEqual(["08:00", "10:00"]);
  });

  it("should call the timesChanges$.next method with the times argument", () => {
    spyOn(component.timesChanges$, "next");
    expect(component.timesChanges$.next).not.toHaveBeenCalled();
    component.addTime();
    expect(component.timesChanges$.next).toHaveBeenCalledWith(["08:00"]);
  });

  it("should remove value from the visitTimesSet", () => {
    spyOn(component.visitTimesSet, "delete").and.callThrough();
    component.visitTimesSet.add("08:00");
    expect(component.visitTimesSet.delete).not.toHaveBeenCalled();
    component.removeTime("08:00");
    expect(component.visitTimesSet.delete).toHaveBeenCalledWith("08:00");
    expect(Array.from(component.visitTimesSet)).toEqual([]);
  });

  it("should remove value from the times array", () => {
    component.times = ["10:00"];
    component.visitTimesSet.add("10:00");
    fixture.detectChanges();
    expect(component.times).toEqual(["10:00"]);
    component.removeTime("10:00");
    expect(component.times).toEqual([]);
  });

  it("should call the timesChanges$.next method with the times argument when removeTime method is called", () => {
    spyOn(component.timesChanges$, "next");
    component.times = ["10:00"];
    component.visitTimesSet.add("10:00");
    fixture.detectChanges();
    expect(component.timesChanges$.next).not.toHaveBeenCalled();
    component.removeTime("10:00");
    expect(component.timesChanges$.next).toHaveBeenCalledWith([]);
  });

  it("should call initChangesCheck when ngOnInit method is called", () => {
    spyOn(component.initChangesCheck, "emit");
    expect(component.initChangesCheck.emit).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(component.initChangesCheck.emit).toHaveBeenCalledWith(
      component.timesChanges$
    );
  });

  describe("with hostElement", () => {
    let host: HTMLElement;

    beforeEach(() => {
      host = fixture.nativeElement;
    });

    it('should render mat-card-title with the title equals "Ustal ogólne godziny wizyt"', () => {
      const title = host.querySelector("mat-card-title");
      expect(title.textContent.trim()).toEqual("Ustal ogólne godziny wizyt");
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

    it("should emit times object when save btn is clicked", () => {
      const button = host.querySelector(".card-button") as HTMLElement;
      spyOn(component.update, "emit");
      expect(component.update.emit).not.toHaveBeenCalled();
      button.click();
      expect(component.update.emit).toHaveBeenCalledWith(component.times);
    });
  });
});
