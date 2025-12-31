import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidInputComponent } from './invalid-input/invalid-input.component';
import { LogoComponent } from './logo/logo.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [InvalidInputComponent, LogoComponent, CommonModule, MatIconModule],
  exports: [InvalidInputComponent, LogoComponent],
})
export class SharedModule {}
