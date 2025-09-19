import { Component } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses = mockedCoursesList.map(c => ({
    ...c,
    authors: c.authors
      .map(id => mockedAuthorsList.find(a => a.id === id)?.name)
      .filter(Boolean) as string[],
  }));

  editable = true; 
  onShow(course: any) { console.log('Show:', course); }
  onEdit(course: any) { console.log('Edit:', course); }
  onDelete(course: any) { console.log('Delete:', course); }
  onSearch(term: string): void {console.log('search:', term);}

}
