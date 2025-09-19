import {  Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder = 'Search';
  @Output() search = new EventEmitter<string>();

  query = '';

  onSubmit(): void {
    const term = this.query.trim();
    this.search.emit(term); 
  }
}

