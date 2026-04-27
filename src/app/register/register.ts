import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {UsuarionormalService} from '../services/usuarionormal.service';
import {UsuarioNormalModel} from '../models/usuarioNormal.model';

/**
 * @component Register
 * @description Componente público de registro de nuevos usuarios en el sistema.
 * Permite crear un usuario de tipo NORMAL mediante un formulario.
 * El tipo de usuario se fija como 'NORMAL' por defecto ya que el registro
 * libre está restringido a este rol; otros roles (Premium, Concurrente)
 * serían asignados desde el panel de administración.
 *
 * @selector app-register
 */
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  /** Servicio para operaciones CRUD sobre usuarios normales en el backend. */
  private readonly usuarioNormalService = inject(UsuarionormalService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Controla la subvista activa dentro del componente. Valor por defecto: 'principal'.  */
  menu: string = 'principal';

  /** Mensaje mostrado al usuario cuando el registro fue exitoso. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en el registro. */
  mensajeError: string = '';

  /** Booleano que indica si hay una solicitud de registro en curso. */
  creandoUsuario: boolean = false;


  /** ID interno (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Número de cédula de identidad del nuevo usuario. */
  cedula: number = 0;

  /** Nombre completo del nuevo usuario. */
  nombre: string = '';

  /** Correo electrónico del nuevo usuario. */
  email: string = '';

  /** Número de teléfono de contacto del nuevo usuario. */
  telefono: number = 0;

  /** Edad del nuevo usuario. */
  edad: number = 0;

  /** Dirección de residencia del nuevo usuario. */
  direccion: string = '';

  /**
   * Tipo de usuario asignado en el registro público.
   * Siempre es 'NORMAL'; los demás tipos se asignan desde administración.
   */
  tipoUsuario: string = 'NORMAL';

  /** Contraseña elegida por el nuevo usuario. */
  contrasena: string = '';

  /**
   * Envía la solicitud de creación de un usuario normal al backend.
   * Limpia mensajes previos, activa el estado de carga y,
   * según la respuesta, muestra mensaje de éxito o error y limpia el formulario.
   */
  crearUsuarioNormal(): void {
    this.limpiarMensajes();
    this.creandoUsuario = true;

    this.usuarioNormalService.postUsuarioNormal(this.cedula, this.nombre, this.email, this.telefono, this.edad, this.direccion, this.tipoUsuario, this.contrasena).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario registrado creado correctamente.';
        this.creandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoUsuario = false;
        this.mensajeError =
          typeof error?.error === 'string' && error.error.trim() !== ''
            ? error.error
            : 'No se pudo registrar el usuario normal.';
        this.cd.detectChanges();
      }
    });

  }

  /**
   * Restablece todos los campos del formulario a sus valores por defecto.
   * Se invoca después de una creación exitosa.
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
   * Limpia los mensajes de éxito y error de la vista.
   * Se invoca antes de cada intento de creación.
   */
  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
