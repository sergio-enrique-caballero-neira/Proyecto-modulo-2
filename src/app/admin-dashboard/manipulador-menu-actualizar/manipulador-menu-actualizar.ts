import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {ManipuladorService} from '../../services/manipulador.service';

/**
 * @component ManipuladorMenuActualizar
 * @description Componente que permite a un Manipulador actualizar su propia información de perfil.
 * Al inicializarse, carga automáticamente los datos actuales del manipulador desde el backend
 * usando el ID recibido como @Input del componente padre, pre-llenando el formulario
 * para que el manipulador solo modifique los campos que desee cambiar.
 *
 *
 * @selector app-manipulador-menu-actualizar
 */
@Component({
  selector: 'app-manipulador-menu-actualizar',
  standalone: false,
  templateUrl: './manipulador-menu-actualizar.html',
  styleUrl: './manipulador-menu-actualizar.css',
})
export class ManipuladorMenuActualizar {

  /** Servicio para operaciones CRUD sobre manipuladores en el backend. */
  private readonly manipuladorService = inject(ManipuladorService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Mensaje mostrado al usuario cuando la actualización fue exitosa. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la actualización. */
  mensajeError: string = '';

  /** Booleano que indica si hay una solicitud de actualización en curso. */
  actualizandoManipulador: boolean = false;

  /**
   * Indica si los datos del manipulador ya fueron cargados desde el backend.
   * Controla la visibilidad del formulario en la plantilla.
   */
  cargado: boolean = false;

  /**
   * ID del manipulador a actualizar.
   * Recibido desde el componente padre (AdminDashboard).
   * Se usa para buscar el registro correcto en el backend y para el PUT.
   */
  @Input() id: number = -1;


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

  /** Contraseña del manipulador. */
  contrasena: string = '';

  /**
   * @lifecycle ngOnInit
   * @description Al inicializar el componente, consulta la lista de manipuladores
   * y pre-carga los datos del manipulador cuyo ID coincide con el @Input recibido.
   * Esto permite mostrar el formulario con los valores actuales antes de editar.
   */
  ngOnInit() {
    this.manipuladorService.getManipuladores().subscribe({
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
          this.area = encontrado.area;
          this.paquetesProcesados = encontrado.paquetesProcesados;
          this.contrasena = encontrado.contrasena;
          this.cargado = true;
          this.cd.detectChanges()
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });
  }

  /**
   * Envía la solicitud de actualización del manipulador al backend con los datos del formulario.
   * Usa el ID recibido como @Input para identificar el registro a modificar.
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
   * Restablece todos los campos del formulario a sus valores por defecto.
   * Se invoca tras operaciones exitosas de creación o actualización.
   */
  limpiarFormulario(): void {
    this.email = '';
    this.telefono = 0;
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
