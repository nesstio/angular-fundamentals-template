import {  RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';


export const routes: Routes = [
    {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./features/auth/registration/registration.module').then(m => m.RegistrationModule),
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then(m => m.CoursesModule),
    canLoad: [AuthorizedGuard]
  },

  // default + fallback → список курсов
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: '**', redirectTo: 'courses' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
