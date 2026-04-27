import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ManipuladorService} from '../../../services/manipulador.service';
import {ManipuladorModel} from '../../../models/manipulador.model';

/**
 * @component AdminMenuManipulador
 * @description Componente de gestión CRUD completa sobre manipuladores del sistema,
 * accesible desde el panel del Administrador.
 * El manipulador es el personal encargado del procesamiento físico de paquetes
 * en bodega.
 *
 * @selector app-admin-menu-manipulador
 */
@Component({
  selector: 'app-admin-menu-manipulador',
  standalone: false,
  templateUrl: './admin-menu-manipulador.html',
  styleUrl: './admin-menu-manipulador.css',
})
export class AdminMenuManipulador {

  /** Servicio para operaciones CRUD sobre manipuladores en el backend. */
  private readonly manipuladorService = inject(ManipuladorService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Controla la subvista activa dentro del componente. Valor por defecto: 'principal'. */
  menu: string = 'principal';

  /** Mensaje mostrado al usuario cuando la operación fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la operación. */
  mensajeError: string = '';

  /** Booleano activo mientras se procesa una solicitud de creación. */
  creandoManipulador: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de actualización. */
  actualizandoManipulador: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de eliminación. */
  eliminandoManipulador: boolean = false;

  /** Booleano activo mientras se carga la lista de manipuladores desde el backend. */
  cargandoManipuladores: boolean = false;

  /** Lista de manipuladores cargada desde el backend para la vista de listado. */
  manipuladores: ManipuladorModel[] = [];


  /** ID del manipulador (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Número de cédula de identidad del manipulador. */
  cedula: number = 0;

  /** Nombre completo del manipulador. */
  nombre: string = '';

  /** Correo electrónico del manipulador. */
  email: string = '';

  /** Número de teléfono del manipulador. */
  telefono: number = 0;

  /** Edad del manipulador. */
  edad: number = 0;

  /** Hora de inicio de turno laboral. */
  inicioTurno: string = '';

  /** Hora de fin de turno laboral. */
  finalTurno: string = '';

  /** Salario del manipulador. */
  salario: number = 0;

  /** Área o zona de trabajo asignada al manipulador dentro de la bodega. */
  area: string = '';

  /** Cantidad de paquetes procesados por el manipulador. */
  paquetesProcesados: number = 0;

  /** Contraseña del manipulador para acceso al sistema. */
  contrasena: string = '';

  /**
   * Cambia la subvista activa y limpia mensajes previos.
   * Si se selecciona 'mostrar', dispara la carga automática del listado.
   * @param menu - Identificador de la subvista a activar
   */
  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarManipuladores();
    }
  }

  /**
   * Envía la solicitud de creación de un nuevo manipulador al backend.
   * Limpia mensajes, activa el estado de carga y, según la respuesta,
   * muestra mensaje de éxito o error y limpia el formulario.
   */
  crearManipulador(): void {
    this.limpiarMensajes();
    this.creandoManipulador = true;
    this.manipuladorService.postManipulador(
      this.cedula, this.nombre, this.email, this.telefono, this.edad, this.inicioTurno, this.finalTurno, this.salario, this.area, this.paquetesProcesados, this.contrasena
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

  /**
   * Envía la solicitud de actualización de un manipulador existente.
   * Requiere que `id` tenga un valor válido (distinto de -1).
   */
  actualizarManipulador(): void {
    this.limpiarMensajes();
    this.actualizandoManipulador = true;
    this.manipuladorService.putManipulador(
      this.id, this.cedula, this.nombre, this.email, this.telefono, this.edad, this.inicioTurno, this.finalTurno, this.salario, this.area, this.paquetesProcesados, this.contrasena
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

  /**
   * Envía la solicitud de eliminación de un manipulador por su ID.
   * Tras el éxito, resetea el ID a -1.
   */
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

  /**
   * Consulta el backend y carga la lista completa de manipuladores.
   * Se invoca automáticamente al seleccionar la subvista 'mostrar'.
   */
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

  /**
   * Restablece todos los campos del formulario a sus valores por defecto.
   * Se invoca tras operaciones exitosas de creación o actualización.
   */
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
    this.area = '';
    this.paquetesProcesados = 0;
    this.contrasena = '';
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
