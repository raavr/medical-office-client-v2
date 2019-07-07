import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {

  formatDate(date: moment.Moment): string {
    return date.format('DD/MM/YYYY'); 
  }

  toMomentList(date: string[]): moment.Moment[] {
    return date.map(dateStr => moment(dateStr, 'DD/MM/YYYY'));
  }
}