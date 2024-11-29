import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthOverviewComponent } from './auth-overview/auth-overview.component';
import { LoginComponent } from './auth-overview/login/login.component';
import { RegisterComponent } from './auth-overview/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { GetCodeComponent } from './auth-overview/get-code/get-code.component';
import { SetCodeComponent } from './auth-overview/set-code/set-code.component';
import { authInterceptor } from './auth-interceptor';
import { SharedModule } from '../shared/components/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AuthOverviewComponent,
    LoginComponent,
    RegisterComponent,
    GetCodeComponent,
    SetCodeComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    MatIconModule,
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  exports: [AuthOverviewComponent],
})
export class AuthModule {}
