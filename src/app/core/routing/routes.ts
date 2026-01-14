import { Routes } from '@angular/router';
import { AuthOverviewComponent } from 'src/app/authentication/auth-overview/auth-overview';
import { DashboardOverviewComponent } from 'src/app/dashboard/dashboard-overview/dashboard-overview.component';
import { PATHS } from './paths';
import { LoginComponent } from 'src/app/authentication/login/login';
import { RegisterComponent } from 'src/app/authentication/register/register';

/**
 * Application routes
 */
export const routes: Routes = [
  {
    path: '',
    component: AuthOverviewComponent,
    children: [
      {
        path: PATHS.login,
        component: LoginComponent,
        children: [
          {
            path: PATHS.forgotPwd,
            component: AuthOverviewComponent,
          },
          {
            path: PATHS.resetPwd,
            component: AuthOverviewComponent,
          },
        ],
      },
      {
        path: PATHS.register,
        component: RegisterComponent,
      },
    ],
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
  //{ path: '', redirectTo: PATHS.login, pathMatch: 'full' },
];
