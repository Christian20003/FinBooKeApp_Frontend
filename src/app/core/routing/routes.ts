import { Routes } from '@angular/router';
import { AuthOverview } from 'src/app/authentication/auth-overview/auth-overview';
import { DashboardOverview } from 'src/app/dashboard/dashboard-overview/dashboard-overview';
import { PATHS } from './paths';
import { Login } from 'src/app/authentication/login/login';
import { Register } from 'src/app/authentication/register/register';

/**
 * Application routes
 */
export const routes: Routes = [
  {
    path: '',
    component: AuthOverview,
    children: [
      {
        path: PATHS.login,
        component: Login,
        children: [
          {
            path: PATHS.forgotPwd,
            component: AuthOverview,
          },
          {
            path: PATHS.resetPwd,
            component: AuthOverview,
          },
        ],
      },
      {
        path: PATHS.register,
        component: Register,
      },
    ],
  },
  // TODO: Replace components
  {
    path: PATHS.dashboard,
    component: DashboardOverview,
  },
  {
    path: PATHS.finances,
    component: DashboardOverview,
  },
  {
    path: PATHS.accounts,
    component: DashboardOverview,
  },
  {
    path: PATHS.profile,
    component: DashboardOverview,
  },
  {
    path: PATHS.settings,
    component: DashboardOverview,
  },
  //{ path: '', redirectTo: PATHS.login, pathMatch: 'full' },
];
