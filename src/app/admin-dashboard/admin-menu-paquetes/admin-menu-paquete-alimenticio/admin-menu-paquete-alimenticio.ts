import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {PaquetealimenticioService} from '../../../services/paquetealimenticio.service';
import {PaqueteAlimenticioModel} from '../../../models/paqueteAlimenticio.model';

/**
 * @component AdminMenuPaqueteAlimenticio
 * @description Componente de gestión CRUD completa sobre paquetes alimenticios,
 * accesible desde el panel del Administrador.
 *
 * @selector app-admin-menu-paquete-alimenticio
 */
@Component({
  selector: 'app-admin-menu-paquete-alimenticio',
  standalone: false,
  templateUrl: './admin-menu-paquete-alimenticio.html',
  styleUrl: './admin-menu-paquete-alimenticio.css',
})
export class AdminMenuPaqueteAlimenticio {

  /** Servicio para operaciones CRUD sobre paquetes alimenticios en el backend. */
  private readonly paqueteAlimenticioService = inject(PaquetealimenticioService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Controla la subvista activa dentro del componente. Valor por defecto: 'principal'. */
  menu: string = 'principal';

  /** Mensaje mostrado al usuario cuando la operación fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la operación. */
  mensajeError: string = '';

  /** Booleano activo mientras se procesa una solicitud de creación. */
  creandoPaquete: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de actualización. */
  actualizandoPaquete: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de eliminación. */
  eliminandoPaquete: boolean = false;

  /** Booleano activo mientras se carga la lista de paquetes desde el backend. */
  cargandoPaquetes: boolean = false;

  /** Lista de paquetes alimenticios cargada desde el backend para la vista de listado. */
  paquetesAlimenticios: PaqueteAlimenticioModel[] = [];


  /** ID del paquete alimenticio (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Descripción del contenido del paquete alimenticio. */
  descripcion: string = '';

  /** Peso del paquete en la unidad definida por el backend. */
  peso: number = 0;

  /** Ciudad o dirección de origen del envío. */
  origen: string = '';

  /** Ciudad o dirección de destino del envío. */
  destino: string = '';

  /** Fecha programada de envío en formato string. */
  fechaEnvio: string = '';

  /** Indica si el paquete requiere cadena de frío (refrigeración). */
  refrigerado: boolean = false;

  /**
   * Cambia la subvista activa y limpia mensajes previos.
   * Si se selecciona 'mostrar', dispara la carga automática del listado.
   * @param menu - Identificador de la subvista a activar
   */
  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarPaquetesAlimenticios();
    }
  }

  /**
   * Envía la solicitud de creación de un nuevo paquete alimenticio al backend.
   * Limpia mensajes, activa el estado de carga y, según la respuesta,
   * muestra mensaje de éxito o error y limpia el formulario.
   */
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

  /**
   * Envía la solicitud de actualización de un paquete alimenticio existente.
   * Requiere que `id` tenga un valor válido (distinto de -1).
   */
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

  /**
   * Envía la solicitud de eliminación de un paquete alimenticio por su ID.
   * Tras el éxito, resetea el ID a -1.
   */
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

  /**
   * Consulta el backend y carga la lista completa de paquetes alimenticios.
   * Se invoca automáticamente al seleccionar la subvista 'mostrar'.
   */
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

  /**
   * Restablece todos los campos del formulario a sus valores por defecto.
   * Se invoca tras operaciones exitosas de creación o actualización.
   */
  limpiarFormulario(): void {
    this.id = -1;
    this.descripcion = '';
    this.peso = 0;
    this.origen = '';
    this.destino = '';
    this.fechaEnvio = '';
    this.refrigerado = false;
  }

  /**
   * Regresa a la subvista principal, limpiando mensajes y el formulario.
   * Equivalente a cancelar la operación en curso.
   */
  volverAlMenuPrincipal(): void {
    this.menu = 'principal';
    this.limpiarMensajes();
    this.limpiarFormulario();
  }

  /**
   * Limpia los mensajes de éxito y error de la vista.
   * Se invoca antes de cada operación CRUD.
   */
  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
