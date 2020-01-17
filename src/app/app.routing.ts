/*
============================================
; Title: app.routing
; Author: Richard Krasso
; Date: 01/09/2020
; Modified By:
; Description: Routing
;===========================================
*/
import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';
import { SessionGuard } from './shared/guards/session.guard';
import {SigninComponent} from './pages/signin/signin.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SecurityQuestionsListComponent } from './pages/admin/security-questions-list/security-questions-list.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'admin/security-questions',
        component: SecurityQuestionsListComponent
      },
      {
        path: 'admin/users',
        component: UserListComponent
      }
    ],
    // use the can activate child to secure the routes
    canActivateChild: [SessionGuard]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: '500',
        component: ServerErrorComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/not-found'
  }
];
