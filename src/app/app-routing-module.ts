import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {UsuariosDashboard} from './usuarios-dashboard/usuarios-dashboard';
import {AdminDashboard} from './admin-dashboard/admin-dashboard';
import { AdminLogin } from './admin-login/admin-login';

/**
 * Definición de rutas principales de la aplicación.
 * Cada entrada asocia un segmento de URL con el componente que debe renderizarse:
 *
 */
const routes: Routes = [{path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: 'usuarios-dashboard', component: UsuariosDashboard},
  {path: 'admin-dashboard', component: AdminDashboard},
  {path: 'admin-login', component: AdminLogin},
  {path: '', redirectTo: '/login', pathMatch: 'full'}];

/**
 * @module AppRoutingModule
 * @description Módulo de enrutamiento raíz de la aplicación de paquetería.
 * Registra las rutas principales mediante `RouterModule.forRoot` y las exporta
 * para que estén disponibles en el `AppModule`.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
