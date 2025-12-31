import { NgClass } from '@angular/common';
import { Component, input, InputSignal, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/auth/auth-overview/authentication.service';
import { loginPath } from 'src/app/auth/auth-routing-module';
import { deleteUser } from 'src/app/shared/stores/UserStore/User.actions';
import { ToastRemoveType, ToastTypes } from 'src/app/shared/models/Toast';
import { ToastService } from '../../toasts/toast.service';

@Component({
  selector: 'app-nav-elements',
  imports: [
    MatIconModule,
    NgClass,
    TranslocoDirective,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-elements.component.html',
  styleUrl: './nav-elements.component.scss',
})
export class NavElementsComponent {
  private authService = inject(AuthenticationService);
  private toastService = inject(ToastService);
  private store = inject(Store);
  private router = inject(Router);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  public type: InputSignal<string> = input<string>('dashboard');
  public borderAnimation: InputSignal<boolean> = input<boolean>(false);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/dashboard.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'finances',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/finances.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'accounts',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/accounts.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'profile',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/profile.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'settings',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/settings.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/logout.svg'
      )
    );
  }

  onLogout(): void {
    this.authService.deleteLogin().subscribe({
      next: () => {
        this.store.dispatch(deleteUser());
        this.router.navigate([loginPath]);
      },
      error: error => {
        this.toastService.addToast(
          error.message,
          ToastTypes.ERROR,
          ToastRemoveType.NONE
        );
      },
    });
  }
}
