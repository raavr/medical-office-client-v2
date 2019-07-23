import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { DirtyCheckGuard } from './dirty-check.guard';
import { of } from 'rxjs';
import { DialogConfirmationComponent } from 'src/app/core/components/dialog-confirmation/dialog-confirmation.component';

describe('DirtyCheckGuard', () => {
  let guard: DirtyCheckGuard;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(null)
            })
          }
        }
      ]
    });

    guard = TestBed.get(DirtyCheckGuard);
    dialog = TestBed.get(MatDialog);
    spyOn(dialog, 'open').and.callThrough();
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', () => {
    const dirtyComponent = {
      isDirty$: [of(false), of(false)]
    };

    guard.canDeactivate(dirtyComponent).subscribe(val => {
      expect(val).toBe(true);
    });
  });

  it('should return false and call dialog.open', () => {
    const dirtyComponent = {
      isDirty$: [of(false), of(true)]
    };

    guard.canDeactivate(dirtyComponent).subscribe(val => {
      expect(val).toBe(false);
      expect(dialog.open).toHaveBeenCalledWith(DialogConfirmationComponent, {
        data: {
          title:
            'Masz niezapisane zmiany. Czy na pewno chcesz opuścić tę stronę?'
        }
      });
    });
  });
});
