import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class ValidatorsService {
  static passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } {
    if(!control.value) {
      return null;
    }

    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
      return null;
    } else {
      return { 'invalid-password': true };
    }
  }

  static passwordMatcher(control: AbstractControl): { [key: string]: boolean } {
    const pass = control.get('password');
    const confPass = control.get('confirmPassword');
    if (!pass || !confPass) {
      return null;
    }

    if (pass.value === confPass.value) {
      confPass.setErrors(null);
      return null;
    } else {
      //workaround: I have to manually set errors on that form control otherwise mat-error is not showing (but it should...)
      confPass.setErrors({ 'nomatch-passwords': true });
      return { 'nomatch-passwords': true };
    }
  }

  static autocompleteMatcher(control: AbstractControl): { [key: string]: boolean } {
    const selection = control.value;
    if (typeof selection === 'string') {
        return { 'nomatch-autocomplete': true };
    }
    return null;
  }

  static currentDateMatcher(control: AbstractControl): { [key: string]: boolean } {
    const date: moment.Moment = control.value;
    if(!control.value) {
      return null;
    }
    if (date instanceof moment) {
      const yesterday = moment().subtract(1, 'days');
      if(date.isAfter(yesterday)) {
        return null;
      }
    }
    
    return { 'invalid-date': true };
  }
}


