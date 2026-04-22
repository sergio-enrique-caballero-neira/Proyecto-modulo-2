import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {AdministradorService} from '../../../services/administrador.service';
import {AdministradorModel} from '../../../models/administrador.model';

@Component({
  selector: 'app-admin-menu-administrador',
  standalone: false,
  templateUrl: './admin-menu-administrador.html',
  styleUrl: './admin-menu-administrador.css',
})
export class AdminMenuAdministrador {
  private readonly administradorService = inject(AdministradorService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoAdministrador: boolean = false;
  actualizandoAdministrador: boolean = false;
  eliminandoAdministrador: boolean = false;
  cargandoAdministradores: boolean = false;
  administradores: AdministradorModel[] = [];

  id: number = -1;
  cedula: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: number = 0;
  edad: number = 0;
  inicioTurno: string = '';
  finalTurno: string = '';
  salario: number = 0;
  rol: string = '';
  accesoTotal: boolean = false;
  contrasena: string = '';

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarAdministradores();
    }
  }

  crearAdministrador(): void {
    this.limpiarMensajes();
    this.creandoAdministrador = true;
    this.administradorService.postAdministrador(
      this.cedula, this.nombre, this.email, this.telefono, this.edad, this.inicioTurno, this.finalTurno, this.salario, this.rol, this.accesoTotal, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Administrador creado correctamente.';
        this.creandoAdministrador = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoAdministrador = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear el administrador.';
        this.cd.detectChanges();
      }
    });
  }

  actualizarAdministrador(): void {
    this.limpiarMensajes();
    this.actualizandoAdministrador = true;
    this.administradorService.putAdministrador(
      this.id, this.cedula, this.nombre, this.email, this.telefono, this.edad, this.inicioTurno, this.finalTurno, this.salario, this.rol, this.accesoTotal, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Administrador actualizado correctamente.';
        this.actualizandoAdministrador = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoAdministrador = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar el administrador.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarAdministrador(): void {
    this.limpiarMensajes();
    this.eliminandoAdministrador = true;
    this.administradorService.deleteAdministrador(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Administrador eliminado correctamente.';
        this.eliminandoAdministrador = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoAdministrador = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar el administrador.';
        this.cd.detectChanges();
      }
    });
  }

  cargarAdministradores(): void {
    this.cargandoAdministradores = true;
    this.administradorService.getAdministradores().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.administradores = respuesta.body;
        }
        this.cargandoAdministradores = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoAdministradores = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de administradores.';
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
    this.inicioTurno = '';
    this.finalTurno = '';
    this.salario = 0;
    this.rol = '';
    this.accesoTotal = false;
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
