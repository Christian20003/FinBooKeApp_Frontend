import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidInputComponent } from './invalid-input/invalid-input.component';
import { LoadingComponent } from './loading/loading.component';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavElementsComponent } from './navbar/nav-elements/nav-elements.component';
import { ToastComponent } from './toasts/toast/toast.component';
import { ToastsComponent } from './toasts/toasts.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    InvalidInputComponent,
    LoadingComponent,
    LogoComponent,
    NavbarComponent,
    NavElementsComponent,
    ToastComponent,
    ToastsComponent,
  ],
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  exports: [
    InvalidInputComponent,
    LoadingComponent,
    LogoComponent,
    NavbarComponent,
    ToastsComponent,
  ],
})
export class SharedModule {}
