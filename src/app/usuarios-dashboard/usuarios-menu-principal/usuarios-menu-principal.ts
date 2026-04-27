import {Component, EventEmitter, Output} from '@angular/core';

/**
 * @component UsuariosMenuPrincipal
 * @description Componente de navegación raíz del dashboard de usuarios.
 * Presenta las opciones disponibles (cartas, paquetes alimenticios, paquetes no alimenticios)
 * y emite eventos al componente padre (UsuariosDashboard) para cambiar la sección activa.
 *
 * @selector app-usuarios-menu-principal
 */
@Component({
  selector: 'app-usuarios-menu-principal',
  standalone: false,
  templateUrl: './usuarios-menu-principal.html',
  styleUrl: './usuarios-menu-principal.css',
})
export class UsuariosMenuPrincipal {

  /**
   * EventEmitter que comunica al componente padre qué sección fue seleccionada.
   * El padre (UsuariosDashboard) escucha este evento para actualizar su propiedad `menu`.
   */
  @Output() menu = new EventEmitter<string>();

  /**
   * Emite el identificador de la sección seleccionada hacia el componente padre.
   * @param menu - Identificador de la opción elegida por el usuario
   */
  seleccionarMenu(menu: string) {
    this.menu.emit(menu);
  }

}
