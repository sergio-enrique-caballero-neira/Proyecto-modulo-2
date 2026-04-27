import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {AdministradorService} from '../../../services/administrador.service';
import {AdministradorModel} from '../../../models/administrador.model';

/**
 * @component AdminMenuAdministrador
 * @description Componente de gestión CRUD completa sobre administradores del sistema.
 * Exclusivo del rol Administrador con acceso total. Permite crear, actualizar,
 * eliminar y listar administradores. Incluye campos propios del rol administrativo
 * como `rol`, `accesoTotal` y datos de turno laboral.
 *
 * @selector app-admin-menu-administrador
 */
@Component({
  selector: 'app-admin-menu-administrador',
  standalone: false,
  templateUrl: './admin-menu-administrador.html',
  styleUrl: './admin-menu-administrador.css',
})
export class AdminMenuAdministrador {

  /** Servicio para operaciones CRUD sobre administradores en el backend. */
  private readonly administradorService = inject(AdministradorService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Controla la subvista activa dentro del componente. Valor por defecto: 'principal'. */
  menu: string = 'principal';

  /** Mensaje mostrado al usuario cuando la operación fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la operación. */
  mensajeError: string = '';

  /** Booleano activo mientras se procesa una solicitud de creación. */
  creandoAdministrador: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de actualización. */
  actualizandoAdministrador: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de eliminación. */
  eliminandoAdministrador: boolean = false;

  /** Booleano activo mientras se carga la lista de administradores desde el backend. */
  cargandoAdministradores: boolean = false;

  /** Lista de administradores cargada desde el backend para la vista de listado. */
  administradores: AdministradorModel[] = [];


  /** ID del administrador (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Número de cédula de identidad del administrador. */
  cedula: number = 0;

  /** Nombre completo del administrador. */
  nombre: string = '';

  /** Correo electrónico del administrador. */
  email: string = '';

  /** Número de teléfono del administrador. */
  telefono: number = 0;

  /** Edad del administrador. */
  edad: number = 0;

  /** Hora de inicio de turno laboral. */
  inicioTurno: string = '';

  /** Hora de fin de turno laboral. */
  finalTurno: string = '';

  /** Salario del administrador. */
  salario: number = 0;

  /**
   * Rol específico del administrador dentro del sistema
   * Determina las acciones permitidas en el dashboard.
   */
  rol: string = '';

  /**
   * Indica si el administrador tiene acceso total al sistema.
   * Si es true, puede gestionar todos los tipos de entidades sin restricciones.
   */
  accesoTotal: boolean = false;

  /** Contraseña del administrador. */
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
      this.cargarAdministradores();
    }
  }

  /**
   * Envía la solicitud de creación de un nuevo administrador al backend.
   * Limpia mensajes, activa el estado de carga y, según la respuesta,
   * muestra mensaje de éxito o error y limpia el formulario.
   */
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

  /**
   * Envía la solicitud de actualización de un administrador existente.
   * Requiere que `id` tenga un valor válido (distinto de -1).
   */
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

  /**
   * Envía la solicitud de eliminación de un administrador por su ID.
   * Tras el éxito, resetea el ID a -1 para indicar que no hay selección activa.
   */
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

  /**
   * Consulta el backend y carga la lista completa de administradores.
   * Se invoca automáticamente al seleccionar la subvista 'mostrar'.
   */
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
    this.rol = '';
    this.accesoTotal = false;
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
