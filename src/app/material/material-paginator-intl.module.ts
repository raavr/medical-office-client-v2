import { MatPaginatorIntl } from '@angular/material';
import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';

@Injectable()
class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.initTranslation();
  }

  initTranslation() {
    this.itemsPerPageLabel = 'Ilość na stronie';
    this.nextPageLabel = 'Następna strona';
    this.previousPageLabel = 'Poprzednia strona';
    this.firstPageLabel = 'Pierwsza strona';
    this.lastPageLabel = 'Ostatnia strona';
  }

  getRangeLabel = function(page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 z ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' z ' + length;
  };
}

@NgModule()
export class MaterialPaginatorIntlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialPaginatorIntlModule,
      providers: [
        {
          provide: MatPaginatorIntl,
          useClass: CustomMatPaginatorIntl
        }
      ]
    };
  }
}
