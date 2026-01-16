import { Component, inject } from '@angular/core';
import { ToastLifeTime } from 'src/app/core';
import { ToastType } from 'src/app/core';
import { ToastService } from 'src/app/core/services/toast/toast-service';
import { DashboardActions } from './dashboard-actions/dashboard-actions';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.scss',
  imports: [DashboardActions],
})
export class DashboardOverview {
  private service = inject(ToastService);

  onAdd() {
    this.service.addToast(
      'Hello World. I am living',
      ToastType.SUCCESS,
      ToastLifeTime.LONG
    );
  }
}
