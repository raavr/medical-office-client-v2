import { Pipe, PipeTransform } from '@angular/core';

const VisitStatuesLang = {
  accepted: 'Zaakceptowano',
  canceled: 'Odrzucono',
  reserved: 'Oczekuje'
};

@Pipe({
  name: 'visitStatus'
})
export class VisitStatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return VisitStatuesLang[value];
  }
}
