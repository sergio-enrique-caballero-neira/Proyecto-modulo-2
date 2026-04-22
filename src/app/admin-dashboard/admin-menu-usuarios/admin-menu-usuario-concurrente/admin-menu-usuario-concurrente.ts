import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {UsuarioconcurrenteService} from '../../../services/usuarioconcurrente.service';
import {UsuarioConcurrenteModel} from '../../../models/usuarioConcurrente.model';

@Component({
  selector: 'app-admin-menu-usuario-concurrente',
  standalone: false,
  templateUrl: './admin-menu-usuario-concurrente.html',
  styleUrl: './admin-menu-usuario-concurrente.css',
})
export class AdminMenuUsuarioConcurrente {
  private readonly usuarioConcurrenteService = inject(UsuarioconcurrenteService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoUsuario: boolean = false;
  actualizandoUsuario: boolean = false;
  eliminandoUsuario: boolean = false;
  cargandoUsuarios: boolean = false;
  usuariosConcurrentes: UsuarioConcurrenteModel[] = [];

  id: number = -1;
  cedula: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: number = 0;
  edad: number = 0;
  direccion: string = '';
  tipoUsuario: string = 'CONCURRENTE';
  pedidosMensuales: number = 0;
  descuento: number = 0;
  contrasena: string = '';

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarUsuariosConcurrentes();
    }
  }

  crearUsuarioConcurrente(): void {
    this.limpiarMensajes();
    this.creandoUsuario = true;
    this.usuarioConcurrenteService.postUsuarioConcurrente(
      this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.pedidosMensuales, this.descuento, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario concurrente creado correctamente.';
        this.creandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear el usuario concurrente.';
        this.cd.detectChanges();
      }
    });
  }

  actualizarUsuarioConcurrente(): void {
    this.limpiarMensajes();
    this.actualizandoUsuario = true;
    this.usuarioConcurrenteService.putUsuarioConcurrente(
      this.id, this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.pedidosMensuales, this.descuento, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario concurrente actualizado correctamente.';
        this.actualizandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar el usuario concurrente.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarUsuarioConcurrente(): void {
    this.limpiarMensajes();
    this.eliminandoUsuario = true;
    this.usuarioConcurrenteService.deleteUsuarioConcurrente(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario concurrente eliminado correctamente.';
        this.eliminandoUsuario = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar el usuario concurrente.';
        this.cd.detectChanges();
      }
    });
  }

  cargarUsuariosConcurrentes(): void {
    this.cargandoUsuarios = true;

    this.usuarioConcurrenteService.getUsuarios().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.usuariosConcurrentes = respuesta.body;
        }
        this.cargandoUsuarios = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoUsuarios = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de usuarios concurrentes.';
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
    this.tipoUsuario = 'CONCURRENTE';
    this.pedidosMensuales = 0;
    this.descuento = 0;
    this.contrasena = '';
  }

  volverAlMenuPrincipal(): void {
    this.menu = 'principal';
    this.limpiarMensajes();
    this.limpiarFormulario();
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
