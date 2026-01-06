import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputErrorComponent } from './form-input-error/form-input-error';
import { LogoComponent } from './logo/logo.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    FormInputErrorComponent,
    LogoComponent,
    CommonModule,
    MatIconModule,
  ],
  exports: [FormInputErrorComponent, LogoComponent],
})
export class SharedModule {}
