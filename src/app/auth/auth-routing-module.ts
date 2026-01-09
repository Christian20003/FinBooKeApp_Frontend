import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './auth-overview/register/register.component';
import { NgModule } from '@angular/core';
import { RequestAccessCodeComponent } from './request-access-code/request-access-code';
import { SetAccessCodeComponent } from './set-access-code/set-access-code';

export const loginPath = 'login';
export const registerPath = 'register';
export const resetPasswordPath = 'resetPassword';

export const authRoutes: Routes = [
  {
    path: loginPath,
    component: LoginComponent,
    children: [
      { path: resetPasswordPath, component: RequestAccessCodeComponent },
      { path: resetPasswordPath, component: SetAccessCodeComponent },
    ],
  },
  { path: registerPath, component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
