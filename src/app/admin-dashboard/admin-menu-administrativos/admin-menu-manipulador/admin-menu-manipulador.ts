import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ManipuladorService} from '../../../services/manipulador.service';
import {ManipuladorModel} from '../../../models/manipulador.model';

@Component({
  selector: 'app-admin-menu-manipulador',
  standalone: false,
  templateUrl: './admin-menu-manipulador.html',
  styleUrl: './admin-menu-manipulador.css',
})
export class AdminMenuManipulador {
  private readonly manipuladorService = inject(ManipuladorService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoManipulador: boolean = false;
  actualizandoManipulador: boolean = false;
  eliminandoManipulador: boolean = false;
  cargandoManipuladores: boolean = false;
  manipuladores: ManipuladorModel[] = [];

  id: number = -1;
  cedula: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: number = 0;
  edad: number = 0;
  direccion: string = '';
  tipoUsuario: string = 'MANIPULADOR';
  especializacion: string = '';
  contrasena: string = '';

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarManipuladores();
    }
  }

  crearManipulador(): void {
    this.limpiarMensajes();
    this.creandoManipulador = true;
    this.manipuladorService.postManipulador(
      this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.especializacion, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Manipulador creado correctamente.';
        this.creandoManipulador = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoManipulador = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear el manipulador.';
        this.cd.detectChanges();
      }
    });
  }

  actualizarManipulador(): void {
    this.limpiarMensajes();
    this.actualizandoManipulador = true;
    this.manipuladorService.putManipulador(
      this.id, this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.especializacion, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Manipulador actualizado correctamente.';
        this.actualizandoManipulador = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoManipulador = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar el manipulador.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarManipulador(): void {
    this.limpiarMensajes();
    this.eliminandoManipulador = true;
    this.manipuladorService.deleteManipulador(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Manipulador eliminado correctamente.';
        this.eliminandoManipulador = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoManipulador = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar el manipulador.';
        this.cd.detectChanges();
      }
    });
  }

  cargarManipuladores(): void {
    this.cargandoManipuladores = true;
    this.manipuladorService.getManipuladores().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.manipuladores = respuesta.body;
        }
        this.cargandoManipuladores = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoManipuladores = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de manipuladores.';
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
    this.tipoUsuario = 'MANIPULADOR';
    this.especializacion = '';
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
