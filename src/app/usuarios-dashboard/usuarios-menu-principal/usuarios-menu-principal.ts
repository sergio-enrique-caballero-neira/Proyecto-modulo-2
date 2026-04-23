import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-usuarios-menu-principal',
  standalone: false,
  templateUrl: './usuarios-menu-principal.html',
  styleUrl: './usuarios-menu-principal.css',
})
export class UsuariosMenuPrincipal {

  @Output() menu = new EventEmitter<string>();

  seleccionarMenu(menu: string) {
    this.menu.emit(menu);
  }

}
