import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: string;
  
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  get icon(): IconProp | null {
  return this.iconName ? (['fas', this.iconName] as IconProp) : null;
}

  // Use the names for the inputs `buttonText` and `iconName`.
}
