import {Component, EventEmitter, Output} from '@angular/core';

/**
 * @component ConductorMenuPrincipal
 * @description Componente de navegación raíz del dashboard del Conductor.
 * Presenta las opciones disponibles para el rol Conductor
 * (actualizar perfil, subir evidencia, etc.) y emite eventos al componente
 * padre (AdminDashboard) para cambiar la sección activa.
 *
 * @selector app-conductor-menu-principal
 */
@Component({
  selector: 'app-conductor-menu-principal',
  standalone: false,
  templateUrl: './conductor-menu-principal.html',
  styleUrl: './conductor-menu-principal.css',
})
export class ConductorMenuPrincipal {

  /**
   * EventEmitter que comunica al componente padre qué sección fue seleccionada.
   * El padre escucha este evento para actualizar su propiedad `menu`.
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
