import {Component, EventEmitter, Output} from '@angular/core';

/**
 * @component AdminMenuPrincipal
 * @description Componente de navegación raíz del dashboard administrativo.
 * Presenta todas las opciones disponibles para el rol Administrador
 * (gestión de personal, usuarios y envíos) y emite eventos al componente
 * padre (AdminDashboard) para cambiar la sección activa.
 *
 * @selector app-admin-menu-principal
 */
@Component({
  selector: 'app-admin-menu-principal',
  standalone: false,
  templateUrl: './admin-menu-principal.html',
  styleUrl: './admin-menu-principal.css',
})
export class AdminMenuPrincipal {

  /**
   * EventEmitter que comunica al componente padre qué sección fue seleccionada.
   * El padre (AdminDashboard) escucha este evento para actualizar su propiedad `menu`.
   */
  @Output() menu = new EventEmitter<string>();

  /**
   * Emite el identificador de la sección seleccionada hacia el componente padre.
   * @param menu - Identificador de la opción elegida
   */
  seleccionarMenu(menu: string) {
    this.menu.emit(menu);
  }

}
