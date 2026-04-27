import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ConductorService} from '../../../services/conductor.service';
import {ConductorModel} from '../../../models/conductor.model';

/**
 * @component AdminMenuConductor
 * @description Componente de gestión CRUD completa sobre conductores del sistema,
 * accesible desde el panel del Administrador.
 * Incluye campos específicos del perfil de conductor: licencia, tipo de vehículo
 * y años de experiencia, además de los datos laborales comunes.
 *
 * @selector app-admin-menu-conductor
 */
@Component({
  selector: 'app-admin-menu-conductor',
  standalone: false,
  templateUrl: './admin-menu-conductor.html',
  styleUrl: './admin-menu-conductor.css',
})
export class AdminMenuConductor {

  /** Servicio para operaciones CRUD sobre conductores en el backend. */
  private readonly conductorService = inject(ConductorService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Controla la subvista activa dentro del componente. Valor por defecto: 'principal'. */
  menu: string = 'principal';

  /** Mensaje mostrado al usuario cuando la operación fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la operación. */
  mensajeError: string = '';

  /** Booleano activa mientras se procesa una solicitud de creación. */
  creandoConductor: boolean = false;

  /** Booleano activa mientras se procesa una solicitud de actualización. */
  actualizandoConductor: boolean = false;

  /** Booleano activa mientras se procesa una solicitud de eliminación. */
  eliminandoConductor: boolean = false;

  /** Booleano activa mientras se carga la lista de conductores desde el backend. */
  cargandoConductores: boolean = false;

  /** Lista de conductores cargada desde el backend para la vista de listado. */
  conductores: ConductorModel[] = [];


  /** ID del conductor (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Número de cédula de identidad del conductor. */
  cedula: number = 0;

  /** Nombre completo del conductor. */
  nombre: string = '';

  /** Correo electrónico del conductor. */
  email: string = '';

  /** Número de teléfono del conductor. */
  telefono: number = 0;

  /** Edad del conductor. */
  edad: number = 0;

  /** Hora de inicio de turno laboral. */
  inicioTurno: string = '';

  /** Hora de fin de turno laboral. */
  finalTurno: string = '';

  /** Salario del conductor. */
  salario: number = 0;

  /** Número o categoría de licencia de conducción. */
  licencia: string = '';

  /** Tipo de vehículo asignado al conductor. */
  tipoVehiculo: string = '';

  /** Años de experiencia del conductor en el área de transporte. */
  experienciaAnios: number = 0;

  /** Contraseña del conductor para acceso al sistema. */
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
      this.cargarConductores();
    }
  }

  /**
   * Envía la solicitud de creación de un nuevo conductor al backend.
   * Limpia mensajes, activa el estado de carga y, según la respuesta,
   * muestra mensaje de éxito o error y limpia el formulario.
   */
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

  /**
   * Envía la solicitud de actualización de un conductor existente.
   * Requiere que `id` tenga un valor válido (distinto de -1).
   */
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

  /**
   * Envía la solicitud de eliminación de un conductor por su ID.
   * Tras el éxito, resetea el ID a -1.
   */
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

  /**
   * Consulta el backend y carga la lista completa de conductores.
   * Se invoca automáticamente al seleccionar la subvista 'mostrar'.
   */
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
    this.licencia = '';
    this.tipoVehiculo = '';
    this.experienciaAnios = 0;
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
