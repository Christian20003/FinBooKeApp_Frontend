import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthOverviewComponent } from './auth/auth-overview/auth-overview.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import {
  loginPath,
  registerPath,
  resetPasswordPath,
} from './auth/auth-routing-module';

export const dashboardPath: string = 'dashboard';
export const financesPath: string = 'finances';
export const accountsPath: string = 'accounts';
export const profilePath: string = 'profile';
export const settingsPath: string = 'settings';

export const routes: Routes = [
  // TODO: Is there a smarter solution?
  {
    path: loginPath,
    component: AuthOverviewComponent,
    children: [{ path: resetPasswordPath, component: AuthOverviewComponent }],
  },
  { path: registerPath, component: AuthOverviewComponent },
  // TODO: Replace components
  { path: dashboardPath, component: DashboardOverviewComponent },
  { path: financesPath, component: DashboardOverviewComponent },
  { path: accountsPath, component: DashboardOverviewComponent },
  { path: profilePath, component: DashboardOverviewComponent },
  { path: settingsPath, component: DashboardOverviewComponent },
  { path: '', redirectTo: loginPath, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
