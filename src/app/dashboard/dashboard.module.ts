import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { SharedModule } from '../shared/components/shared.module';
import { DashboardActionsComponent } from './dashboard-overview/dashboard-actions/dashboard-actions.component';

@NgModule({
  declarations: [DashboardOverviewComponent, DashboardActionsComponent],
  imports: [CommonModule, SharedModule],
  exports: [DashboardOverviewComponent],
})
export class DashboardModule {}
