import {Component, EventEmitter, Output} from '@angular/core';

/**
 * @component ManipuladorMenuPrincipal
 * @description Componente de navegación raíz del dashboard del Manipulador.
 * Presenta las opciones disponibles para el rol Manipulador
 * (actualizar perfil, subir evidencia, etc.) y emite eventos al componente
 * padre (AdminDashboard) para cambiar la sección activa.
 *
 * @selector app-manipulador-menu-principal
 */
@Component({
  selector: 'app-manipulador-menu-principal',
  standalone: false,
  templateUrl: './manipulador-menu-principal.html',
  styleUrl: './manipulador-menu-principal.css',
})
export class ManipuladorMenuPrincipal {

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
