import { TestBed } from '@angular/core/testing';

import { FormatDateService } from './format-date.service';
import { fn as momentProto } from 'moment';
import * as moment from 'moment';

describe('FormatDateService', () => {
  let service: FormatDateService;

  beforeEach(() => {
    service = TestBed.get(FormatDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return date in format "DD/MM/YYYY"', () => {
    spyOn(momentProto, 'format').and.returnValue('25/07/2019');
    expect(service.formatDate(moment())).toEqual('25/07/2019');
  });

  //TODO: fix this test
  // it('should return list of Moment objects', () => {
  //   const dates = [
  //     '12/08/2019',
  //     '13/08/2019',
  //     '14/08/2019',
  //   ];
  //   jasmine.createSpy('moment', moment).and.returnValue('12/07/2019');
  //   expect(service.toMomentList(dates)).toEqual(['12/07/2019','12/07/2019','12/07/2019'] as any[]);
  // });

});
