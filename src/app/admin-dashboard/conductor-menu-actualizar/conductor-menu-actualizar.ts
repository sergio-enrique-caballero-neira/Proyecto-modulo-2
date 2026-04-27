import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {ConductorService} from '../../services/conductor.service';

/**
 * @component ConductorMenuActualizar
 * @description Componente que permite a un Conductor actualizar su propia información de perfil.
 * Al inicializarse, carga automáticamente los datos actuales del conductor desde el backend
 * usando el ID recibido como input del componente padre, pre-llenando el formulario
 * para que el conductor solo modifique los campos que desee cambiar.
 *
 * @selector app-conductor-menu-actualizar
 */
@Component({
  selector: 'app-conductor-menu-actualizar',
  standalone: false,
  templateUrl: './conductor-menu-actualizar.html',
  styleUrl: './conductor-menu-actualizar.css',
})
export class ConductorMenuActualizar {

  /** Servicio para operaciones CRUD sobre conductores en el backend. */
  private readonly conductorService = inject(ConductorService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Mensaje mostrado al usuario cuando la actualización fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la actualización. */
  mensajeError: string = '';

  /** Booleano que indica si hay una solicitud de actualización en curso. */
  actualizandoConductor: boolean = false;

  /**
   * Indica si los datos del conductor ya fueron cargados desde el backend.
   * Controla la visibilidad del formulario en la plantilla.
   */
  cargado: boolean = false;

  /**
   * ID del conductor a actualizar.
   * Recibido desde el componente padre.
   * Se usa para buscar el registro correcto en el backend y para el PUT.
   */
  @Input() id: number = -1;


  /** Número de cédula del conductor. */
  cedula: number = 0;

  /** Nombre completo del conductor. */
  nombre: string = '';

  /** Correo electrónico del conductor. */
  email: string = '';

  /** Número de teléfono del conductor. */
  telefono: number = 0;

  /** Edad del conductor. */
  edad: number = 0;

  /** Hora de inicio de turno. */
  inicioTurno: string = '';

  /** Hora de fin de turno. */
  finalTurno: string = '';

  /** Salario del conductor. */
  salario: number = 0;

  /** Número o categoría de licencia de conducción. */
  licencia: string = '';

  /** Tipo de vehículo asignado al conductor. */
  tipoVehiculo: string = '';

  /** Años de experiencia como conductor. */
  experienciaAnios: number = 0;

  /** Contraseña del conductor. */
  contrasena: string = '';

  /**
   * @lifecycle ngOnInit
   * @description Al inicializar el componente, consulta la lista de conductores
   * y pre-carga los datos del conductor cuyo ID coincide con el input recibido.
   * Esto permite mostrar el formulario con los valores actuales antes de editar.
   */

  ngOnInit() {
    this.conductorService.getConductores().subscribe({
      next: (usu) => {
        const encontrado = usu.body?.find(u => u.id === this.id);

        if (encontrado !== undefined) {
          this.cedula = encontrado.cedula;
          this.nombre = encontrado.nombre;
          this.email = encontrado.email;
          this.telefono = encontrado.telefono;
          this.edad = encontrado.edad;
          this.inicioTurno = encontrado.inicioTurno;
          this.finalTurno = encontrado.finalTurno;
          this.salario = encontrado.salario;
          this.licencia = encontrado.licencia;
          this.tipoVehiculo = encontrado.tipoVehiculo;
          this.experienciaAnios = encontrado.experienciaAnios;
          this.contrasena = encontrado.contrasena;
          this.cargado = true;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });
  }

  /**
   * Envía la solicitud de actualización del conductor al backend con los datos del formulario.
   * Usa el ID recibido como @Input para identificar el registro a modificar.
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
   * Limpia únicamente los campos editables sensibles del formulario.
   * No limpia todos los campos porque el conductor solo actualiza datos específicos
   * (correo, teléfono, licencia, tipo de vehículo y contraseña).
   */
  limpiarFormulario(): void {
    this.email = '';
    this.telefono = 0;
    this.licencia = '';
    this.tipoVehiculo = '';
    this.contrasena = '';
  }

  /**
   * Limpia los mensajes de éxito y error de la vista.
   * Se invoca antes de cada intento de actualización.
   */
  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
