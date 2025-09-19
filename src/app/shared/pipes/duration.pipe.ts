import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number | null | undefined): string {
    if (value == null || !isFinite(value as number)) {
      return '00:00 hour';
    }

    const mins = Math.max(0, Math.floor(Number(value)));
    const h = Math.floor(mins / 60);
    const m = mins % 60;

    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');

    const unit = (h === 0 || h === 1) ? 'hour' : 'hours'; 
    return `${hh}:${mm} ${unit}`;
  }
}
