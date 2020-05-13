import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService, LogoutService } from './auth.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './auth.guard';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

//export function tokenGetter() {
//  return localStorage.getItem('access_token');
//}

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,

    JwtModule
    .forRoot({
      config: {
        //tokenGetter,
        tokenGetter: tokenGetter,
       // whitelistedDomains: ['localhost:8080'],
        //blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
  })
  ,

    SegurancaRoutingModule,
  ],
  providers: [
    JwtHelperService,
    AuthService,
    AuthGuard,
    LogoutService ]
})
export class SegurancaModule { }
