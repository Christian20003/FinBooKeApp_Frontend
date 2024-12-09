import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthOverviewComponent } from '../auth/auth-overview/auth-overview.component';
import { DashboardOverviewComponent } from '../dashboard/dashboard-overview/dashboard-overview.component';
import {
  loginPath,
  registerPath,
  resetPasswordPath,
} from '../auth/auth-routing-module';

export const dashboardPath: string = 'dashboard';
export const financesPath: string = 'finances';
export const accountsPath: string = 'accounts';
export const profilePath: string = 'profile';
export const settingsPath: string = 'settings';

export const routes: Routes = [
  {
    path: loginPath,
    component: AuthOverviewComponent,
    children: [
      {
        path: resetPasswordPath,
        component: AuthOverviewComponent,
        data: { animation: 'AuthenticationPage' },
      },
    ],
    data: { animation: 'AuthenticationPage' },
  },
  {
    path: registerPath,
    component: AuthOverviewComponent,
    data: { animation: 'AuthenticationPage' },
  },
  // TODO: Replace components
  {
    path: dashboardPath,
    component: DashboardOverviewComponent,
    data: { animation: 'DashboardPage' },
  },
  {
    path: financesPath,
    component: DashboardOverviewComponent,
    data: { animation: 'FinancesPage' },
  },
  {
    path: accountsPath,
    component: DashboardOverviewComponent,
    data: { animation: 'AccountsPage' },
  },
  {
    path: profilePath,
    component: DashboardOverviewComponent,
    data: { animation: 'ProfilePage' },
  },
  {
    path: settingsPath,
    component: DashboardOverviewComponent,
    data: { animation: 'SettingsPage' },
  },
  { path: '', redirectTo: loginPath, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
