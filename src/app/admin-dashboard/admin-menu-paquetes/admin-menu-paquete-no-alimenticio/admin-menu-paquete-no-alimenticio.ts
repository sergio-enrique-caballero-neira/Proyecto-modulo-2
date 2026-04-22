import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {PaquetenoalimenticioService} from '../../../services/paquetenoalimenticio.service';
import {PaqueteNoAlimenticioModel} from '../../../models/paqueteNoAlimenticio.model';

@Component({
  selector: 'app-admin-menu-paquete-no-alimenticio',
  standalone: false,
  templateUrl: './admin-menu-paquete-no-alimenticio.html',
  styleUrl: './admin-menu-paquete-no-alimenticio.css',
})
export class AdminMenuPaqueteNoAlimenticio {
  private readonly paqueteNoAlimenticioService = inject(PaquetenoalimenticioService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoPaquete: boolean = false;
  actualizandoPaquete: boolean = false;
  eliminandoPaquete: boolean = false;
  cargandoPaquetes: boolean = false;
  paquetesNoAlimenticios: PaqueteNoAlimenticioModel[] = [];

  id: number = -1;
  descripcion: string = '';
  peso: number = 0;
  origen: string = '';
  destino: string = '';
  fechaEnvio: string = '';
  fragil: boolean = false;

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarPaquetesNoAlimenticios();
    }
  }

  crearPaqueteNoAlimenticio(): void {
    this.limpiarMensajes();
    this.creandoPaquete = true;
    this.paqueteNoAlimenticioService.postPaqueteNoAlimenticio(
      this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.fragil
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Paquete no alimenticio creado correctamente.';
        this.creandoPaquete = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoPaquete = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear el paquete no alimenticio.';
        this.cd.detectChanges();
      }
    });
  }

  actualizarPaqueteNoAlimenticio(): void {
    this.limpiarMensajes();
    this.actualizandoPaquete = true;
    this.paqueteNoAlimenticioService.putPaqueteNoAlimenticio(
      this.id, this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.fragil
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Paquete no alimenticio actualizado correctamente.';
        this.actualizandoPaquete = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoPaquete = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar el paquete no alimenticio.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarPaqueteNoAlimenticio(): void {
    this.limpiarMensajes();
    this.eliminandoPaquete = true;
    this.paqueteNoAlimenticioService.deletePaqueteNoAlimenticio(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Paquete no alimenticio eliminado correctamente.';
        this.eliminandoPaquete = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoPaquete = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar el paquete no alimenticio.';
        this.cd.detectChanges();
      }
    });
  }

  cargarPaquetesNoAlimenticios(): void {
    this.cargandoPaquetes = true;
    this.paqueteNoAlimenticioService.getPaquetesNoAlimenticios().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.paquetesNoAlimenticios = respuesta.body;
        }
        this.cargandoPaquetes = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoPaquetes = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de paquetes no alimenticios.';
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
    this.fragil = false;
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
