import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {UsuarionormalService} from '../../../services/usuarionormal.service';
import {UsuarioNormalModel} from '../../../models/usuarioNormal.model';

@Component({
  selector: 'app-admin-menu-usuario-normal',
  standalone: false,
  templateUrl: './admin-menu-usuario-normal.html',
  styleUrl: './admin-menu-usuario-normal.css',
})
export class AdminMenuUsuarioNormal {

  private readonly usuarioNormalService = inject(UsuarionormalService);

  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoUsuario: boolean = false;
  actualizandoUsuario: boolean = false;
  eliminandoUsuario: boolean = false;
  cargandoUsuarios: boolean = false;
  usuariosNormales: UsuarioNormalModel[] = [];

  id: number = -1;
  cedula: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: number = 0;
  edad: number = 0;
  direccion: string = '';
  tipoUsuario: string = 'NORMAL';
  contrasena: string = '';

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();

    if (menu === 'mostrar') {
      this.cargarUsuariosNormales();
    }
  }

  crearUsuarioNormal(): void {
    this.limpiarMensajes();
    this.creandoUsuario = true;

    this.usuarioNormalService.postUsuarioNormal(this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.contrasena).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario normal creado correctamente.';
        this.creandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoUsuario = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo crear el usuario normal.';
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

  actualizarUsuarioNormal(): void {
    this.limpiarMensajes();
    this.actualizandoUsuario = true;

    this.usuarioNormalService.putUsuarioNormal(
      this.id,
      this.cedula,
      this.nombre,
      this.email,
      this.telefono,
      this.edad,
      this.direccion,
      this.tipoUsuario,
      this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario normal actualizado correctamente.';
        this.actualizandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoUsuario = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo actualizar el usuario normal.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarUsuarioNormal(): void {
    this.limpiarMensajes();
    this.eliminandoUsuario = true;

    this.usuarioNormalService.deleteUsuarioNormal(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario normal eliminado correctamente.';
        this.eliminandoUsuario = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoUsuario = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo eliminar el usuario normal.';
        this.cd.detectChanges();
      }
    });
  }

  volverAlMenuPrincipal(): void {
    this.menu = 'principal';
    this.limpiarMensajes();
    this.limpiarFormulario();
  }

  cargarUsuariosNormales(): void {
    this.cargandoUsuarios = true;

    this.usuarioNormalService.getUsuarios().subscribe({
      next: (respuesta) => {
        if (respuesta.body){
          this.usuariosNormales = respuesta.body;
        }
        this.cargandoUsuarios = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoUsuarios = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo obtener la lista de usuarios normales.';
        this.cd.detectChanges();
      }
    });
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
