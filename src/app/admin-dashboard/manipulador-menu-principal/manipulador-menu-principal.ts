import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-manipulador-menu-principal',
  standalone: false,
  templateUrl: './manipulador-menu-principal.html',
  styleUrl: './manipulador-menu-principal.css',
})
export class ManipuladorMenuPrincipal {

  @Output() menu = new EventEmitter<string>();

  seleccionarMenu(menu: string) {
    this.menu.emit(menu);
  }

}
