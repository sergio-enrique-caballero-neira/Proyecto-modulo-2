import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-admin-menu-principal',
  standalone: false,
  templateUrl: './admin-menu-principal.html',
  styleUrl: './admin-menu-principal.css',
})
export class AdminMenuPrincipal {

  @Output() menu = new EventEmitter<string>();

  seleccionarMenu(menu: string) {
    this.menu.emit(menu);
  }

}
