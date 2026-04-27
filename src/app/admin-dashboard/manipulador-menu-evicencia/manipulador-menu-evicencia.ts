import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {ManipuladorService} from '../../services/manipulador.service';

/**
 * @component ManipuladorMenuEvicencia
 * @description Componente que permite al Manipulador cargar una imagen como evidencia
 * del procesamiento de un paquete en bodega. Soporta dos métodos de carga:
 * selección manual mediante input de archivo y arrastrar-y-soltar (drag & drop).
 *
 * Sigue el mismo patrón que `ConductorMenuEvidencia`, adaptado al contexto
 * del manipulador (evidencia de procesamiento en bodega en lugar de entrega).
 *
 * @selector app-manipulador-menu-evidencia
 */
@Component({
  selector: 'app-manipulador-menu-evicencia',
  standalone: false,
  templateUrl: './manipulador-menu-evicencia.html',
  styleUrl: './manipulador-menu-evicencia.css',
})
export class ManipuladorMenuEvicencia {

  /** Servicio para operaciones CRUD sobre manipuladores en el backend. */
  private readonly manipuladorService = inject(ManipuladorService);

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Mensaje mostrado al usuario cuando fue exitosa la solicitud. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error. */
  mensajeError: string = '';

  /** Booleano que indica si hay una solicitud de actualización en curso. */
  actualizandoManipulador: boolean = false;

  /**
   * ID del manipulador.
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

  /** Cantidad de nuevos paquetes. */
  paquenesNuevos: number = 0;

  /**
   * Vista previa de la imagen seleccionada, generada mediante FileReader.
   * Es null si no se ha seleccionado ningún archivo aún.
   */
  imagePreview: string | ArrayBuffer | null = null;

  /**
   * Indica si el usuario está arrastrando un archivo sobre la zona de drop.
   * Se usa en la plantilla para aplicar estilos visuales de retroalimentación.
   */
  isDragging = false;

  /**
   * @lifecycle ngOnInit
   * @description Al inicializar el componente, consulta la lista de manipuladores
   * y pre-carga los datos del manipulador cuyo ID coincide con el @Input recibido.
   * Esto asegura que el PUT de evidencia no sobreescriba los campos existentes.
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
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });
  }

  /**
   * Recarga los datos actualizados del manipulador desde el backend.
   * Se invoca justo antes de ejecutar el PUT de evidencia para garantizar
   * que `paquetesProcesados` esté sincronizado con el valor real del servidor.
   */
  findManipulador() {
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
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });
  }

  /**
   * Maneja el evento de arrastre sobre la zona de drop.
   * Previene el comportamiento por defecto del navegador y activa el estado visual de arrastre.
   *
   * @param event - Evento nativo DragEvent del navegador.
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  /**
   * Maneja el evento de salida del cursor de la zona de drop.
   * Desactiva el estado visual de arrastre.
   *
   * @param event - Evento nativo DragEvent del navegador.
   */
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  /**
   * Maneja el evento de soltar un archivo en la zona de drop.
   * Desactiva el estado de arrastre, extrae el primer archivo soltado
   * y lo procesa mediante `handleFile`.
   *
   * @param event - Evento nativo DragEvent que contiene los archivos arrastrados.
   */
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  /**
   * Maneja la selección de un archivo a través del input de tipo file.
   * Extrae el primer archivo seleccionado y lo procesa mediante `handleFile`.
   *
   * @param event - Evento de cambio del elemento input[type="file"].
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  /**
   * Valida que el archivo sea una imagen y genera una vista previa en base64
   * usando la API FileReader del navegador.
   * Si el archivo no es una imagen, muestra un mensaje de error en la vista.
   *
   * @param file - Archivo seleccionado o arrastrado por el usuario.
   */
  handleFile(file: File) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.cd.detectChanges()
      };
      reader.readAsDataURL(file);
    } else {
      this.mensajeError = "Por favor, selecciona una imagen válida.";
    }
  }

  /**
   * Sube la evidencia de procesamiento del manipulador al backend.
   * Recarga previamente los datos actuales del manipulador para evitar
   * inconsistencias, luego ejecuta el PUT sumando `paquenesNuevos` al
   * total existente de `paquetesProcesados`.
   * Si no hay imagen seleccionada, muestra un mensaje de error y cancela la operación.
   */
  subirEvicencia() {
    this.findManipulador();
    if (this.imagePreview !== null && this.imagePreview !== '') {
      this.actualizandoManipulador = true;
      this.manipuladorService.putManipulador(
        this.id, this.cedula, this.nombre, this.email, this.telefono, this.edad, this.inicioTurno, this.finalTurno, this.salario, this.area, +this.paquetesProcesados + +this.paquenesNuevos, this.contrasena
      ).subscribe({
        next: (respuesta) => {
          this.mensajeExito = respuesta || 'Evidencia Subida Exitosamente.';
          this.mensajeError = '';
          this.actualizandoManipulador = false;
          this.cd.detectChanges();
        },
        error: (error) => {
          this.actualizandoManipulador = false;
          this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar el manipulador.';
          this.mensajeExito = '';
          this.cd.detectChanges();
        }
      });
    } else {
      this.mensajeError = "Por favor, selecciona una imagen antes de subirla.";
      this.mensajeExito = "";
      this.cd.detectChanges();
    }
  }
}
