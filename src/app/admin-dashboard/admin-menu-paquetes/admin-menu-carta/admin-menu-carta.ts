import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CartaService} from '../../../services/carta.service';
import {CartaModel} from '../../../models/carta.model';

/**
 * @component AdminMenuCarta
 * @description Componente de gestión CRUD completa sobre cartas del sistema,
 * accesible desde el panel del Administrador.
 *
 * @selector app-admin-menu-carta
 */
@Component({
  selector: 'app-admin-menu-carta',
  standalone: false,
  templateUrl: './admin-menu-carta.html',
  styleUrl: './admin-menu-carta.css',
})
export class AdminMenuCarta {
  /** Servicio para operaciones CRUD sobre cartas en el backend. */
  private readonly cartaService = inject(CartaService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Controla la subvista activa dentro del componente. Valor por defecto: 'principal'. */
  menu: string = 'principal';

  /** Mensaje mostrado al usuario cuando la operación fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la operación. */
  mensajeError: string = '';

  /** Booleano activo mientras se procesa una solicitud de creación. */
  creandoCarta: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de actualización. */
  actualizandoCarta: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de eliminación. */
  eliminandoCarta: boolean = false;

  /** Booleano activo mientras se carga la lista de cartas desde el backend. */
  cargandoCartas: boolean = false;

  /** Lista de cartas cargada desde el backend para la vista de listado. */
  cartas: CartaModel[] = [];


  /** ID de la carta (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Descripción del contenido de la carta. */
  descripcion: string = '';

  /** Peso de la carta en la unidad definida por el backend. */
  peso: number = 0;

  /** Ciudad o dirección de origen del envío. */
  origen: string = '';

  /** Ciudad o dirección de destino del envío. */
  destino: string = '';

  /** Fecha programada de envío en formato string. */
  fechaEnvio: string = '';

  /** Tamaño de la carta. */
  tamano: string = '';

  /**
   * Cambia la subvista activa y limpia mensajes previos.
   * Si se selecciona 'mostrar', dispara la carga automática del listado.
   * @param menu - Identificador de la subvista a activar
   */
  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarCartas();
    }
  }

  /**
   * Envía la solicitud de creación de una nueva carta al backend.
   * Limpia mensajes, activa el estado de carga y, según la respuesta,
   * muestra mensaje de éxito o error y limpia el formulario.
   */
  crearCarta(): void {
    this.limpiarMensajes();
    this.creandoCarta = true;
    this.cartaService.postCarta(this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.tamano).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Carta creada correctamente.';
        this.creandoCarta = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoCarta = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear la carta.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Envía la solicitud de actualización de una carta existente.
   * Requiere que `id` tenga un valor válido (distinto de -1).
   */
  actualizarCarta(): void {
    this.limpiarMensajes();
    this.actualizandoCarta = true;
    this.cartaService.putCarta(
      this.id, this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.tamano
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Carta actualizada correctamente.';
        this.actualizandoCarta = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoCarta = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar la carta.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Envía la solicitud de eliminación de una carta por su ID.
   * Tras el éxito, resetea el ID a -1.
   */
  eliminarCarta(): void {
    this.limpiarMensajes();
    this.eliminandoCarta = true;
    this.cartaService.deleteCarta(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Carta eliminada correctamente.';
        this.eliminandoCarta = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoCarta = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar la carta.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Consulta el backend y carga la lista completa de cartas.
   * Se invoca automáticamente al seleccionar la subvista 'mostrar'.
   */
  cargarCartas(): void {
    this.cargandoCartas = true;
    this.cartaService.getCartas().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.cartas = respuesta.body;
        }
        this.cargandoCartas = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoCartas = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de cartas.';
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
    this.tamano = '';
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
