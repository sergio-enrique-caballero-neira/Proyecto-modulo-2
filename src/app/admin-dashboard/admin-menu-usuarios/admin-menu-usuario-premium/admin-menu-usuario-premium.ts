import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {UsuariopremiumService} from '../../../services/usuariopremium.service';
import {UsuarioPremiumModel} from '../../../models/usuarioPremium.model';

/**
 * @component AdminMenuUsuarioPremium
 * @description Componente de gestión CRUD completa sobre usuarios de tipo Premium,
 * accesible desde el panel del Administrador.
 * El usuario Premium es aquel con membresía de alto nivel que goza de un descuento
 * fijo independiente del volumen mensual de pedidos. Su único campo exclusivo
 * respecto al usuario Normal es `descuento`, que en este caso es estático
 * y asignado manualmente por el administrador.
 *
 * @selector app-admin-menu-usuario-premium
 */
@Component({
  selector: 'app-admin-menu-usuario-premium',
  standalone: false,
  templateUrl: './admin-menu-usuario-premium.html',
  styleUrl: './admin-menu-usuario-premium.css',
})
export class AdminMenuUsuarioPremium {

  /** Servicio para operaciones CRUD sobre usuarios premium en el backend. */
  private readonly usuarioPremiumService = inject(UsuariopremiumService);

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

  /** Lista de usuarios premium cargada desde el backend para la vista de listado. */
  usuariosPremium: UsuarioPremiumModel[] = [];


  /** ID del usuario (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Número de cédula de identidad del usuario. */
  cedula: number = 0;

  /** Nombre completo del usuario. */
  nombre: string = '';

  /** Correo electrónico del usuario (usado también como identificador de login). */
  email: string = '';

  /** Número de teléfono de contacto del usuario. */
  telefono: number = 0;

  /** Edad del usuario. */
  edad: number = 0;

  /** Dirección de residencia del usuario. */
  direccion: string = '';

  /**
   * Tipo de usuario. Se fija como 'PREMIUM' por defecto.
   * El administrador puede modificarlo si se requiere cambiar la categoría.
   */
  tipoUsuario: string = 'PREMIUM';

  /**
   * Porcentaje de descuento fijo asignado al usuario Premium.
   * A diferencia del usuario Concurrente, este descuento no varía con el
   * volumen mensual de pedidos sino que es definido directamente por el administrador.
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
      this.cargarUsuariosPremium();
    }
  }

  /**
   * Envía la solicitud de creación de un nuevo usuario premium al backend.
   * Limpia mensajes, activa el estado de carga y, según la respuesta,
   * muestra mensaje de éxito o error y limpia el formulario.
   */
  crearUsuarioPremium(): void {
    this.limpiarMensajes();
    this.creandoUsuario = true;

    this.usuarioPremiumService.postUsuarioPremium(
      this.cedula,
      this.nombre,
      this.email,
      this.telefono,
      this.edad,
      this.direccion,
      this.tipoUsuario,
      this.descuento,
      this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario premium creado correctamente.';
        this.creandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error
          : 'No se pudo crear el usuario premium.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Envía la solicitud de actualización de un usuario premium existente.
   * Requiere que `id` tenga un valor válido (distinto de -1).
   */
  actualizarUsuarioPremium(): void {
    this.limpiarMensajes();
    this.actualizandoUsuario = true;

    this.usuarioPremiumService.putUsuarioPremium(
      this.id,
      this.cedula,
      this.nombre,
      this.email,
      this.telefono,
      this.edad,
      this.direccion,
      this.tipoUsuario,
      this.descuento,
      this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario premium actualizado correctamente.';
        this.actualizandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== ''
          ? error.error
          : 'No se pudo actualizar el usuario premium.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Envía la solicitud de eliminación de un usuario premium por su ID.
   * Tras el éxito, resetea el ID a -1.
   */
  eliminarUsuarioPremium(): void {
    this.limpiarMensajes();
    this.eliminandoUsuario = true;

    this.usuarioPremiumService.deleteUsuarioPremium(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario premium eliminado correctamente.';
        this.eliminandoUsuario = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== ''
          ? error.error
          : 'No se pudo eliminar el usuario premium.';
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Consulta el backend y carga la lista completa de usuarios premium.
   * Se invoca automáticamente al seleccionar la subvista 'mostrar'.
   */
  cargarUsuariosPremium(): void {
    this.cargandoUsuarios = true;

    this.usuarioPremiumService.getUsuarios().subscribe({
      next: (respuesta) => {
        this.usuariosPremium = respuesta.body ?? [];
        this.cargandoUsuarios = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoUsuarios = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== ''
          ? error.error
          : 'No se pudo obtener la lista de usuarios premium.';
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
    this.tipoUsuario = 'PREMIUM';
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
