import { Pipe, PipeTransform } from '@angular/core';

const NotificationTypeLang = {
  success: 'zaakceptowana',
  danger: 'odrzucona'
};

@Pipe({
  name: 'notificationType'
})
export class NotificationTypePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return NotificationTypeLang[value];
  }
}
