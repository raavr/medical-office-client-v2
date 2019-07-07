import {
  MomentDateAdapter,
  MatMomentDateModule
} from '@angular/material-moment-adapter';
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
} from '@angular/material';
import { ModuleWithProviders, NgModule } from '@angular/core';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [MatMomentDateModule],
  exports: [MatMomentDateModule]
})
export class MomentDateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MomentDateModule,
      providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }]
    };
  }

  static forFeature(): ModuleWithProviders {
    return {
      ngModule: MomentDateModule,
      /* TODO (temporary workaround):
       * These providers should be inside forRoot method but it doesn't work ->
       * datepicker doesn't use these date formats in lazy loaded modules
       */
      providers: [
        {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
      ]
    };
  }
}
