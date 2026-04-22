import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { Login } from './login/login';
import { Register } from './register/register';
import { UsuariosDashboard } from './usuarios-dashboard/usuarios-dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminLogin } from './admin-login/admin-login';
import { AdminMenuPrincipal } from './admin-dashboard/admin-menu-principal/admin-menu-principal';
import { AdminMenuUsuarioNormal } from './admin-dashboard/admin-menu-usuarios/admin-menu-usuario-normal/admin-menu-usuario-normal';
import { AdminMenuUsuarioPremium } from './admin-dashboard/admin-menu-usuarios/admin-menu-usuario-premium/admin-menu-usuario-premium';
import { AdminMenuUsuarioConcurrente } from './admin-dashboard/admin-menu-usuarios/admin-menu-usuario-concurrente/admin-menu-usuario-concurrente';
import { AdminMenuAdministrador } from './admin-dashboard/admin-menu-administrativos/admin-menu-administrador/admin-menu-administrador';
import { AdminMenuConductor } from './admin-dashboard/admin-menu-administrativos/admin-menu-conductor/admin-menu-conductor';
import { AdminMenuManipulador } from './admin-dashboard/admin-menu-administrativos/admin-menu-manipulador/admin-menu-manipulador';
import { AdminMenuPaqueteAlimenticio } from './admin-dashboard/admin-menu-paquetes/admin-menu-paquete-alimenticio/admin-menu-paquete-alimenticio';
import { AdminMenuPaqueteNoAlimenticio } from './admin-dashboard/admin-menu-paquetes/admin-menu-paquete-no-alimenticio/admin-menu-paquete-no-alimenticio';
import { AdminMenuCarta } from './admin-dashboard/admin-menu-paquetes/admin-menu-carta/admin-menu-carta';

@NgModule({
  declarations: [
    App,
    Login,
    Register,
    UsuariosDashboard,
    AdminDashboard,
    AdminLogin,
    AdminMenuPrincipal,
    AdminMenuUsuarioNormal,
    AdminMenuUsuarioPremium,
    AdminMenuUsuarioConcurrente,
    AdminMenuAdministrador,
    AdminMenuConductor,
    AdminMenuManipulador,
    AdminMenuPaqueteAlimenticio,
    AdminMenuPaqueteNoAlimenticio,
    AdminMenuCarta,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
