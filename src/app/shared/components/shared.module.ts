import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidInputComponent } from './invalid-input/invalid-input.component';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavElementsComponent } from './navbar/nav-elements/nav-elements.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    InvalidInputComponent,
    LogoComponent,
    NavbarComponent,
    NavElementsComponent,
  ],
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  exports: [InvalidInputComponent, LogoComponent, NavbarComponent],
})
export class SharedModule {}
