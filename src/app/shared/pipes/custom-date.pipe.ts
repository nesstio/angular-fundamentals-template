import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): string {
    if (value == null) return '';

    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '';

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
  }
}
