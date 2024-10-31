import { Component } from '@angular/core';
import { ToastRemoveType } from 'src/app/shared';
import { ToastTypes } from 'src/app/shared';
import { ToastService } from 'src/app/shared/components/toasts/toast.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss',
})
export class DashboardOverviewComponent {
  constructor(private service: ToastService) {}

  onAdd() {
    this.service.addToast(
      'Hello World. I am living',
      ToastTypes.SUCCESS,
      ToastRemoveType.LONG
    );
  }
}
