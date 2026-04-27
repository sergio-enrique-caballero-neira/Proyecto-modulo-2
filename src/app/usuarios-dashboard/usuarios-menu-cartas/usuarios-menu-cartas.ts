import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CartaService} from '../../services/carta.service';

/**
 * @component UsuariosMenuCartas
 * @description Componente para que el usuario registre el envío de una carta.
 * Gestiona el formulario de creación, las llamadas al servicio backend
 * y los mensajes de retroalimentación al usuario.
 *
 * @selector app-usuarios-menu-cartas
 */
@Component({
  selector: 'app-usuarios-menu-cartas',
  standalone: false,
  templateUrl: './usuarios-menu-cartas.html',
  styleUrl: './usuarios-menu-cartas.css',
})

export class UsuariosMenuCartas {

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

  /** Booleano que indica si hay una solicitud de creación en curso. */
  creandoCarta: boolean = false;


  /** ID interno (se inicializa en -1 como valor nulo). */
  id: number = -1;

  /** Descripción del contenido de la carta. */
  descripcion: string = '';

  /** Peso de la carta. */
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
   * Envía la solicitud de creación de una carta al backend.
   * Limpia mensajes previos, activa el estado de carga y,
   * según la respuesta, muestra mensaje de éxito o error y limpia el formulario.
   */
  crearCarta(): void {
    this.limpiarMensajes();
    this.creandoCarta = true;
    this.cartaService.postCarta(this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.tamano).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Carta Enviada correctamente.';
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
    this.tamano = '';
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
