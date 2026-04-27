import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {PaquetealimenticioService} from '../../services/paquetealimenticio.service';

/**
 * @component UsuariosMenuPaquetesAlimenticios
 * @description Componente para que el usuario registre el envío de un paquete alimenticio.
 * Gestiona el formulario de creación, las llamadas al servicio backend
 * y los mensajes de retroalimentación al usuario.
 * A diferencia de los paquetes no alimenticios, incluye la opción de indicar
 * si el paquete requiere refrigeración.
 *
 * @selector app-usuarios-menu-paquetes-alimenticios
 */
@Component({
  selector: 'app-usuarios-menu-paquetes-alimenticios',
  standalone: false,
  templateUrl: './usuarios-menu-paquetes-alimenticios.html',
  styleUrl: './usuarios-menu-paquetes-alimenticios.css',
})
export class UsuariosMenuPaquetesAlimenticios {

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

  /** Booleano que indica si hay una solicitud de creación en curso. */
  creandoPaquete: boolean = false;


  /** ID interno (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Descripción del contenido del paquete alimenticio. */
  descripcion: string = '';

  /** Peso del paquete alimenticio. */
  peso: number = 0;

  /** Ciudad o dirección de origen del envío. */
  origen: string = '';

  /** Ciudad o dirección de destino del envío. */
  destino: string = '';

  /** Fecha programada de envío en formato string. */
  fechaEnvio: string = '';

  /**
   * Indica si el paquete requiere cadena de frío (refrigeración).
   */
  refrigerado: boolean = false;

  /**
   * Envía la solicitud de creación de un paquete alimenticio al backend.
   * Limpia mensajes previos, activa el estado de carga y,
   * según la respuesta, muestra mensaje de éxito o error y limpia el formulario.
   */
  crearPaqueteAlimenticio(): void {
    this.limpiarMensajes();
    this.creandoPaquete = true;
    this.paqueteAlimenticioService.postPaqueteAlimenticio(
      this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.refrigerado
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Paquete alimenticio Enviado correctamente.';
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
   * Restablece todos los campos del formulario a sus valores por defecto.
   * Se invoca después de una creación exitosa.
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
   * Limpia los mensajes de éxito y error de la vista.
   * Se invoca antes de cada intento de creación.
   */
  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
