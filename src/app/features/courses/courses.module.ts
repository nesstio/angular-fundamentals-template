import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseInfoComponent } from '../course-info/course-info.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent, 
    CourseInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
