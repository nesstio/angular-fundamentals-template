import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { AdminGuard } from '../../user/guards/admin.guard';


const routes: Routes = [
  { path: '', component: CoursesComponent},          // /courses
  { path: 'add', component: CourseInfoComponent, canActivate: [AdminGuard]},    // /courses/add
  { path: 'edit/:id', component: CourseInfoComponent, canActivate: [AdminGuard] }, // /courses/edit/:id
  { path: ':id', component: CourseInfoComponent, },    // /courses/:id
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}