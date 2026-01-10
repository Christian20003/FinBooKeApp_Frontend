import { Routes } from '@angular/router';
import { AuthOverviewComponent } from 'src/app/authentication/auth-overview/auth-overview';
import { DashboardOverviewComponent } from 'src/app/dashboard/dashboard-overview/dashboard-overview.component';
import { PATHS } from './paths';

/**
 * Application routes
 */
export const routes: Routes = [
  {
    path: PATHS.login,
    component: AuthOverviewComponent,
    children: [
      {
        path: PATHS.forgotPwd,
        component: AuthOverviewComponent,
      },
    ],
  },
  {
    path: PATHS.register,
    component: AuthOverviewComponent,
  },
  // TODO: Replace components
  {
    path: PATHS.dashboard,
    component: DashboardOverviewComponent,
  },
  {
    path: PATHS.finances,
    component: DashboardOverviewComponent,
  },
  {
    path: PATHS.accounts,
    component: DashboardOverviewComponent,
  },
  {
    path: PATHS.profile,
    component: DashboardOverviewComponent,
  },
  {
    path: PATHS.settings,
    component: DashboardOverviewComponent,
  },
  { path: '', redirectTo: PATHS.login, pathMatch: 'full' },
];
