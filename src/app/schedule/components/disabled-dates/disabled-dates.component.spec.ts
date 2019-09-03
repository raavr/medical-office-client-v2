import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DisabledDatesComponent } from "./disabled-dates.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormatDateService } from "src/app/visits/services/format-date.service";

describe("DisabledDatesComponent", () => {
  let component: DisabledDatesComponent;
  let fixture: ComponentFixture<DisabledDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisabledDatesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FormatDateService,
          useValue: {
            formatDate: () => "22/08/2019"
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should add form control value to the datesStrSet", () => {
    spyOn(component.datesStrSet, "add").and.callThrough();
    expect(component.datesStrSet.add).not.toHaveBeenCalled();
    component.addDate();
    expect(component.datesStrSet.add).toHaveBeenCalledWith("22/08/2019");
    expect(Array.from(component.datesStrSet)).toEqual(["22/08/2019"]);
  });

  it("should add form control value to the disabledDates array", () => {
    component.disabledDates = ["12/08/2019"];
    component.datesStrSet.add("12/08/2019");
    fixture.detectChanges();
    expect(component.disabledDates).toEqual(["12/08/2019"]);
    component.addDate();
    expect(component.disabledDates).toEqual(["12/08/2019", "22/08/2019"]);
  });

  it("should call the datesChanges$.next method with the disabledDates argument", () => {
    spyOn(component.datesChanges$, "next");
    expect(component.datesChanges$.next).not.toHaveBeenCalled();
    component.addDate();
    expect(component.datesChanges$.next).toHaveBeenCalledWith(["22/08/2019"]);
  });

  it("should remove value from the datesStrSet", () => {
    spyOn(component.datesStrSet, "delete").and.callThrough();
    component.datesStrSet.add("22/08/2019");
    expect(component.datesStrSet.delete).not.toHaveBeenCalled();
    component.removeDate("22/08/2019");
    expect(component.datesStrSet.delete).toHaveBeenCalledWith("22/08/2019");
    expect(Array.from(component.datesStrSet)).toEqual([]);
  });

  it("should remove value from the disabledDates array", () => {
    component.disabledDates = ["22/08/2019"];
    component.datesStrSet.add("22/08/2019");
    fixture.detectChanges();
    expect(component.disabledDates).toEqual(["22/08/2019"]);
    component.removeDate("22/08/2019");
    expect(component.disabledDates).toEqual([]);
  });

  it("should call the datesChanges$.next method with the disabledDates argument when removeTime method is called", () => {
    spyOn(component.datesChanges$, "next");
    component.disabledDates = ["22/08/2019"];
    component.datesStrSet.add("22/08/2019");
    fixture.detectChanges();
    expect(component.datesChanges$.next).not.toHaveBeenCalled();
    component.removeDate("22/08/2019");
    expect(component.datesChanges$.next).toHaveBeenCalledWith([]);
  });

  it("should call initChangesCheck when ngOnInit method is called", () => {
    spyOn(component.initChangesCheck, "emit");
    expect(component.initChangesCheck.emit).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(component.initChangesCheck.emit).toHaveBeenCalledWith(
      component.datesChanges$
    );
  });

  describe("with hostElement", () => {
    let host: HTMLElement;

    beforeEach(() => {
      host = fixture.nativeElement;
    });

    it('should render mat-card-title with the title equals "Ustal niedostępne dni wizyt"', () => {
      const title = host.querySelector("mat-card-title");
      expect(title.textContent.trim()).toEqual("Ustal niedostępne dni wizyt");
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
        component.disabledDates
      );
    });
  });
});
