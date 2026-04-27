import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {UsuarionormalService} from '../../../services/usuarionormal.service';
import {UsuarioNormalModel} from '../../../models/usuarioNormal.model';

/**
 * @component AdminMenuUsuarioNormal
 * @description Componente de gestión CRUD completa sobre usuarios de tipo Normal,
 * accesible desde el panel del Administrador.
 * El usuario Normal es el tipo base del sistema: no tiene descuentos automáticos
 * ni métricas de pedidos. Sus campos son los comunes a todos los tipos de usuario.
 *
 * @selector app-admin-menu-usuario-normal
 */
@Component({
  selector: 'app-admin-menu-usuario-normal',
  standalone: false,
  templateUrl: './admin-menu-usuario-normal.html',
  styleUrl: './admin-menu-usuario-normal.css',
})
export class AdminMenuUsuarioNormal {

  /** Servicio para operaciones CRUD sobre usuarios normales en el backend. */
  private readonly usuarioNormalService = inject(UsuarionormalService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Controla la subvista activa dentro del componente. Valor por defecto: 'principal'. */
  menu: string = 'principal';

  /** Mensaje mostrado al usuario cuando la operación fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la operación. */
  mensajeError: string = '';

  /** Booleano activo mientras se procesa una solicitud de creación. */
  creandoUsuario: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de actualización. */
  actualizandoUsuario: boolean = false;

  /** Booleano activo mientras se procesa una solicitud de eliminación. */
  eliminandoUsuario: boolean = false;

  /** Booleano activo mientras se carga la lista de usuarios desde el backend. */
  cargandoUsuarios: boolean = false;

  /** Lista de usuarios normales cargada desde el backend para la vista de listado. */
  usuariosNormales: UsuarioNormalModel[] = [];


  /** ID del usuario (se inicializa en -1 como valor nulo). */
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
   * Tipo de usuario asignado. Se fija como 'NORMAL' por defecto.
   * El administrador puede modificarlo si se requiere cambiar la categoría.
   */
  tipoUsuario: string = 'NORMAL';

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
      this.cargarUsuariosNormales();
    }
  }

  /**
   * Envía la solicitud de creación de un nuevo usuario normal al backend.
   * Limpia mensajes, activa el estado de carga y, según la respuesta,
   * muestra mensaje de éxito o error y limpia el formulario.
   */
  crearUsuarioNormal(): void {
    this.limpiarMensajes();
    this.creandoUsuario = true;

    this.usuarioNormalService.postUsuarioNormal(this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.contrasena).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario normal creado correctamente.';
        this.creandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoUsuario = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo crear el usuario normal.';
        this.cd.detectChanges();
      }
    });

  }

  /**
   * Envía la solicitud de actualización de un usuario normal existente.
   * Requiere que `id` tenga un valor válido (distinto de -1).
   */
  actualizarUsuarioNormal(): void {
    this.limpiarMensajes();
    this.actualizandoUsuario = true;

    this.usuarioNormalService.putUsuarioNormal(
      this.id,
      this.cedula,
      this.nombre,
      this.email,
      this.telefono,
      this.edad,
      this.direccion,
      this.tipoUsuario,
      this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario normal actualizado correctamente.';
        this.actualizandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoUsuario = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo actualizar el usuario normal.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Envía la solicitud de eliminación de un usuario normal por su ID.
   * Tras el éxito, resetea el ID a -1 para indicar que no hay selección activa.
   */
  eliminarUsuarioNormal(): void {
    this.limpiarMensajes();
    this.eliminandoUsuario = true;

    this.usuarioNormalService.deleteUsuarioNormal(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario normal eliminado correctamente.';
        this.eliminandoUsuario = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoUsuario = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo eliminar el usuario normal.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Consulta el backend y carga la lista completa de usuarios normales.
   * Se invoca automáticamente al seleccionar la subvista 'mostrar'.
   */
  cargarUsuariosNormales(): void {
    this.cargandoUsuarios = true;

    this.usuarioNormalService.getUsuarios().subscribe({
      next: (respuesta) => {
        if (respuesta.body){
          this.usuariosNormales = respuesta.body;
        }
        this.cargandoUsuarios = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoUsuarios = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo obtener la lista de usuarios normales.';
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
    this.tipoUsuario = 'NORMAL';
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
