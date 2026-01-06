import { Component, inject } from '@angular/core';
import { ToastLifeTime } from 'src/app/core';
import { ToastType } from 'src/app/core';
import { ToastService } from 'src/app/core/services/toast/toast-service';
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
      ToastType.SUCCESS,
      ToastLifeTime.LONG
    );
  }
}
