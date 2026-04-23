import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-conductor-menu-principal',
  standalone: false,
  templateUrl: './conductor-menu-principal.html',
  styleUrl: './conductor-menu-principal.css',
})
export class ConductorMenuPrincipal {

  @Output() menu = new EventEmitter<string>();

  seleccionarMenu(menu: string) {
    this.menu.emit(menu);
  }

}
