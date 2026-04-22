import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {PaquetealimenticioService} from '../../../services/paquetealimenticio.service';
import {PaqueteAlimenticioModel} from '../../../models/paqueteAlimenticio.model';

@Component({
  selector: 'app-admin-menu-paquete-alimenticio',
  standalone: false,
  templateUrl: './admin-menu-paquete-alimenticio.html',
  styleUrl: './admin-menu-paquete-alimenticio.css',
})
export class AdminMenuPaqueteAlimenticio {
  private readonly paqueteAlimenticioService = inject(PaquetealimenticioService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoPaquete: boolean = false;
  actualizandoPaquete: boolean = false;
  eliminandoPaquete: boolean = false;
  cargandoPaquetes: boolean = false;
  paquetesAlimenticios: PaqueteAlimenticioModel[] = [];

  id: number = -1;
  descripcion: string = '';
  peso: number = 0;
  origen: string = '';
  destino: string = '';
  fechaEnvio: string = '';
  refrigerado: boolean = false;

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarPaquetesAlimenticios();
    }
  }

  crearPaqueteAlimenticio(): void {
    this.limpiarMensajes();
    this.creandoPaquete = true;
    this.paqueteAlimenticioService.postPaqueteAlimenticio(
      this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.refrigerado
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Paquete alimenticio creado correctamente.';
        this.creandoPaquete = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoPaquete = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear el paquete alimenticio.';
        this.cd.detectChanges();
      }
    });
  }

  actualizarPaqueteAlimenticio(): void {
    this.limpiarMensajes();
    this.actualizandoPaquete = true;
    this.paqueteAlimenticioService.putPaqueteAlimenticio(
      this.id, this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.refrigerado
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Paquete alimenticio actualizado correctamente.';
        this.actualizandoPaquete = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoPaquete = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar el paquete alimenticio.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarPaqueteAlimenticio(): void {
    this.limpiarMensajes();
    this.eliminandoPaquete = true;
    this.paqueteAlimenticioService.deletePaqueteAlimenticio(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Paquete alimenticio eliminado correctamente.';
        this.eliminandoPaquete = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoPaquete = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar el paquete alimenticio.';
        this.cd.detectChanges();
      }
    });
  }

  cargarPaquetesAlimenticios(): void {
    this.cargandoPaquetes = true;

    this.paqueteAlimenticioService.getPaquetesAlimenticios().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.paquetesAlimenticios = respuesta.body;
        }
        this.cargandoPaquetes = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoPaquetes = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de paquetes alimenticios.';
        this.cd.detectChanges();
      }
    });
  }

  limpiarFormulario(): void {
    this.id = -1;
    this.descripcion = '';
    this.peso = 0;
    this.origen = '';
    this.destino = '';
    this.fechaEnvio = '';
    this.refrigerado = false;
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
