import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';
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
    ]
  }
];
