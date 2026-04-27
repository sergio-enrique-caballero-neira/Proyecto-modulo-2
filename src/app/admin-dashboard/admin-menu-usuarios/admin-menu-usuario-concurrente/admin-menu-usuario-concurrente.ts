import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {UsuarioconcurrenteService} from '../../../services/usuarioconcurrente.service';
import {UsuarioConcurrenteModel} from '../../../models/usuarioConcurrente.model';

/**
 * @component AdminMenuUsuarioConcurrente
 * @description Componente de gestión CRUD completa sobre usuarios de tipo Concurrente,
 * accesible desde el panel del Administrador.
 * El usuario Concurrente es aquel que realiza envíos con alta frecuencia mensual.
 *
 * @selector app-admin-menu-usuario-concurrente
 */

@Component({
  selector: 'app-admin-menu-usuario-concurrente',
  standalone: false,
  templateUrl: './admin-menu-usuario-concurrente.html',
  styleUrl: './admin-menu-usuario-concurrente.css',
})
export class AdminMenuUsuarioConcurrente {
  /** Servicio para operaciones CRUD sobre usuarios concurrentes en el backend. */
  private readonly usuarioConcurrenteService = inject(UsuarioconcurrenteService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Controla la subvista activa dentro del componente. Valor por defecto: 'principal'. */
  menu: string = 'principal';

  /** Mensaje mostrado al usuario cuando la operación fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la operación. */
  mensajeError: string = '';

  /** Boolean activo mientras se procesa una solicitud de creación. */
  creandoUsuario: boolean = false;

  /** Boolean activo mientras se procesa una solicitud de actualización. */
  actualizandoUsuario: boolean = false;

  /** Boolean activo mientras se procesa una solicitud de eliminación. */
  eliminandoUsuario: boolean = false;

  /** Boolean activo mientras se carga la lista de usuarios desde el backend. */
  cargandoUsuarios: boolean = false;

  /** Lista de usuarios concurrentes cargada desde el backend para la vista de listado. */
  usuariosConcurrentes: UsuarioConcurrenteModel[] = [];


  /** ID del usuario (se inicializa en -1 como valor nulo).*/
  id: number = -1;

  /** Número de cédula de identidad del usuario. */
  cedula: number = 0;

  /** Nombre completo del usuario. */
  nombre: string = '';

  /** Correo electrónico del usuario. */
  email: string = '';

  /** Número de teléfono de contacto del usuario. */
  telefono: number = 0;

  /** Edad del usuario. */
  edad: number = 0;

  /** Dirección de residencia del usuario. */
  direccion: string = '';

  /**
   * Tipo de usuario. Se fija como 'CONCURRENTE' por defecto.
   * El administrador puede modificarlo si se requiere cambiar la categoría.
   */
  tipoUsuario: string = 'CONCURRENTE';

  /**
   * Número de pedidos realizados por el usuario en el mes actual.
   * Determina la elegibilidad y el cálculo del descuento por volumen.
   */
  pedidosMensuales: number = 0;

  /**
   * Porcentaje de descuento aplicado al usuario por su volumen de pedidos mensuales.
   * A diferencia del usuario Premium, este descuento es dinámico y puede variar mes a mes.
   */
  descuento: number = 0;

  /** Contraseña del usuario para acceso al sistema. */
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
      this.cargarUsuariosConcurrentes();
    }
  }

  /**
   * Envía la solicitud de creación de un nuevo usuario concurrente al backend.
   * Limpia mensajes, activa el estado de carga y, según la respuesta,
   * muestra mensaje de éxito o error y limpia el formulario.
   */
  crearUsuarioConcurrente(): void {
    this.limpiarMensajes();
    this.creandoUsuario = true;
    this.usuarioConcurrenteService.postUsuarioConcurrente(
      this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.pedidosMensuales, this.descuento, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario concurrente creado correctamente.';
        this.creandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear el usuario concurrente.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Envía la solicitud de actualización de un usuario concurrente existente.
   * Requiere que `id` tenga un valor válido (distinto de -1).
   */
  actualizarUsuarioConcurrente(): void {
    this.limpiarMensajes();
    this.actualizandoUsuario = true;
    this.usuarioConcurrenteService.putUsuarioConcurrente(
      this.id, this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.pedidosMensuales, this.descuento, this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario concurrente actualizado correctamente.';
        this.actualizandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar el usuario concurrente.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Envía la solicitud de eliminación de un usuario concurrente por su ID.
   * Tras el éxito, resetea el ID a -1.
   */
  eliminarUsuarioConcurrente(): void {
    this.limpiarMensajes();
    this.eliminandoUsuario = true;
    this.usuarioConcurrenteService.deleteUsuarioConcurrente(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario concurrente eliminado correctamente.';
        this.eliminandoUsuario = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar el usuario concurrente.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Consulta el backend y carga la lista completa de usuarios concurrentes.
   * Se invoca automáticamente al seleccionar la subvista 'mostrar'.
   */
  cargarUsuariosConcurrentes(): void {
    this.cargandoUsuarios = true;

    this.usuarioConcurrenteService.getUsuarios().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.usuariosConcurrentes = respuesta.body;
        }
        this.cargandoUsuarios = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoUsuarios = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de usuarios concurrentes.';
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
    this.direccion = '';
    this.tipoUsuario = 'CONCURRENTE';
    this.pedidosMensuales = 0;
    this.descuento = 0;
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
