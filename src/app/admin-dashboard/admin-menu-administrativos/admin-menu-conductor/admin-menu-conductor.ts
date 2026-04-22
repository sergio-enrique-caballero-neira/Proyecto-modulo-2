import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ConductorService} from '../../../services/conductor.service';
import {ConductorModel} from '../../../models/conductor.model';

@Component({
  selector: 'app-admin-menu-conductor',
  standalone: false,
  templateUrl: './admin-menu-conductor.html',
  styleUrl: './admin-menu-conductor.css',
})
export class AdminMenuConductor {
  private readonly conductorService = inject(ConductorService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoConductor: boolean = false;
  actualizandoConductor: boolean = false;
  eliminandoConductor: boolean = false;
  cargandoConductores: boolean = false;
  conductores: ConductorModel[] = [];

  id: number = -1;
  cedula: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: number = 0;
  edad: number = 0;
  inicioTurno: string = '';
  finalTurno: string = '';
  salario: number = 0;
  licencia: string = '';
  tipoVehiculo: string = '';
  experienciaAnios: number = 0;
  contrasena: string = '';

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarConductores();
    }
  }

  crearConductor(): void {
    this.limpiarMensajes();
    this.creandoConductor = true;
    this.conductorService.postConductor(
      this.cedula, this.nombre, this.email, this.telefono, this.edad, this.inicioTurno, this.finalTurno, this.salario, this.licencia, this.tipoVehiculo, this.experienciaAnios, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Conductor creado correctamente.';
        this.creandoConductor = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoConductor = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear el conductor.';
        this.cd.detectChanges();
      }
    });
  }

  actualizarConductor(): void {
    this.limpiarMensajes();
    this.actualizandoConductor = true;
    this.conductorService.putConductor(
      this.id, this.cedula, this.nombre, this.email, this.telefono, this.edad, this.inicioTurno, this.finalTurno, this.salario, this.licencia, this.tipoVehiculo, this.experienciaAnios, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Conductor actualizado correctamente.';
        this.actualizandoConductor = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoConductor = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar el conductor.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarConductor(): void {
    this.limpiarMensajes();
    this.eliminandoConductor = true;
    this.conductorService.deleteConductor(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Conductor eliminado correctamente.';
        this.eliminandoConductor = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoConductor = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar el conductor.';
        this.cd.detectChanges();
      }
    });
  }

  cargarConductores(): void {
    this.cargandoConductores = true;
    this.conductorService.getConductores().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.conductores = respuesta.body;
        }
        this.cargandoConductores = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoConductores = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de conductores.';
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
    this.licencia = '';
    this.tipoVehiculo = '';
    this.experienciaAnios = 0;
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
