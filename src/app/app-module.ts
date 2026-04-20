import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { Login } from './login/login';
import { Register } from './register/register';
import { UsuariosDashboard } from './usuarios-dashboard/usuarios-dashboard';

@NgModule({
  declarations: [App, Login, Register, UsuariosDashboard],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
