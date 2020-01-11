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
      }
    ]
  }
];
