import { Component, inject } from '@angular/core';
import { ToastRemoveType } from 'src/app/shared';
import { ToastTypes } from 'src/app/shared';
import { ToastService } from 'src/app/shared/components/toasts/toast.service';
import { DashboardActionsComponent } from './dashboard-actions/dashboard-actions.component';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss',
  imports: [DashboardActionsComponent],
})
export class DashboardOverviewComponent {
  private service = inject(ToastService);

  onAdd() {
    this.service.addToast(
      'Hello World. I am living',
      ToastTypes.SUCCESS,
      ToastRemoveType.LONG
    );
  }
}
