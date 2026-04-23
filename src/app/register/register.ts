import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {UsuarionormalService} from '../services/usuarionormal.service';
import {UsuarioNormalModel} from '../models/usuarioNormal.model';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private readonly usuarioNormalService = inject(UsuarionormalService);

  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoUsuario: boolean = false;

  id: number = -1;
  cedula: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: number = 0;
  edad: number = 0;
  direccion: string = '';
  tipoUsuario: string = 'NORMAL';
  contrasena: string = '';

  crearUsuarioNormal(): void {
    this.limpiarMensajes();
    this.creandoUsuario = true;

    this.usuarioNormalService.postUsuarioNormal(this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.contrasena).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario registrado creado correctamente.';
        this.creandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoUsuario = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo registrar el usuario normal.';
        this.cd.detectChanges();
      }
    });

  }

  limpiarFormulario(): void {
    this.id = -1;
    this.cedula = 0;
    this.nombre = '';
    this.email = '';
    this.telefono = 0;
    this.edad = 0;
    this.direccion = '';
    this.tipoUsuario = 'NORMAL';
    this.contrasena = '';
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
