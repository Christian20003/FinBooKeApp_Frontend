import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidInputComponent } from './invalid-input/invalid-input.component';
import { LoadingComponent } from './loading/loading.component';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SmallErrorMsgComponent } from './small-error-msg/small-error-msg.component';
import { NavElementsComponent } from './navbar/nav-elements/nav-elements.component';
import { ToastComponent } from './toasts/toast/toast.component';
import { ToastsComponent } from './toasts/toasts.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [
    InvalidInputComponent,
    LoadingComponent,
    LogoComponent,
    NavbarComponent,
    SmallErrorMsgComponent,
    NavElementsComponent,
    ToastComponent,
    ToastsComponent,
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [
    InvalidInputComponent,
    LoadingComponent,
    LogoComponent,
    NavbarComponent,
    SmallErrorMsgComponent,
    ToastsComponent,
  ],
})
export class SharedModule {}
