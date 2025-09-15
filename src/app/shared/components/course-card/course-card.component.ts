import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course!: {
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
  };

  @Input() editable = false;

  @Output() clickOnShow = new EventEmitter<void>();
}
