import { Component, OnInit } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/shared/mocks/mocks';
import { CoursesStoreService } from "../../services/courses-store.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{
  courses$ = this.store.courses$;
  isLoading$ = this.store.isLoading$;

  editable = true;

  constructor(private store: CoursesStoreService) {}

  ngOnInit(): void {
    this.store.getAll().subscribe();
  }

onSearch(term: string) {
  this.store.searchCourses(term).subscribe(); 
}

  courses = mockedCoursesList.map(c => ({
    ...c,
    authors: c.authors
      .map(id => mockedAuthorsList.find(a => a.id === id)?.name)
      .filter(Boolean) as string[],
  }));

  onShow(course: any) { console.log('Show:', course); }
  onEdit(course: any) { console.log('Edit:', course); }
  onDelete(course: any) { console.log('Delete:', course); }
}
