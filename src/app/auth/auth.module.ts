import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthOverviewComponent } from './auth-overview/auth-overview.component';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './auth-overview/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RequestAccessCodeComponent } from './request-access-code/request-access-code';
import { SetAccessCodeComponent } from './set-access-code/set-access-code';
// import { authInterceptor } from './auth-interceptor';
import { SharedModule } from '../shared/components/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { LoadingComponent } from '../shared';

@NgModule({
  imports: [
    AuthOverviewComponent,
    LoginComponent,
    RegisterComponent,
    RequestAccessCodeComponent,
    SetAccessCodeComponent,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    MatIconModule,
    TranslocoDirective,
    LoadingComponent,
  ],
  //providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  exports: [AuthOverviewComponent],
})
export class AuthModule {}
