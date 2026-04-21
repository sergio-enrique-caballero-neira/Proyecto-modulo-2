import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {

  usuario: string = "";
  contrasena: string = "";

  errorNombre: boolean = false;
  errorContrasena: boolean = false;

  seccionActiva: string = 'nada'
  seleccionado: boolean = false;

  cambiarSeccion(nombre: string) {
    this.seccionActiva = nombre;
    this.seleccionado = true;
  }

}
