import {ChangeDetectorRef, Component, inject} from '@angular/core';

/**
 * @component ConductorMenuEvidencia
 * @description Componente que permite al Conductor cargar una imagen como evidencia
 * de entrega de un paquete o carta. Soporta dos métodos de carga:
 * selección manual mediante input de archivo y arrastrar-y-soltar.
 *
 * Una vez seleccionada la imagen, se genera una vista previa antes de confirmar
 * la subida. Solo se aceptan archivos de tipo imagen.
 *
 * @selector app-conductor-menu-evidencia
 */
@Component({
  selector: 'app-conductor-menu-evidencia',
  standalone: false,
  templateUrl: './conductor-menu-evidencia.html',
  styleUrl: './conductor-menu-evidencia.css',
})
export class ConductorMenuEvidencia {

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

  /** Mensaje mostrado al usuario cuando la evidencia fue subida correctamente. */
  mensajeExito: string = '';

  /** Mensaje mostrado al usuario cuando ocurre un error en la carga o validación. */
  mensajeError: string = '';

  /** Servicio para forzar la detección de cambios en la vista. */
  private cd = inject(ChangeDetectorRef);

  /**
   * Maneja el evento de arrastre sobre la zona de drop.
   * Previene el comportamiento por defecto del navegador y activa el estado visual.
   * @param event - Evento de drag nativo del DOM
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  /**
   * Maneja el evento de salida del arrastre desde la zona de drop.
   * Desactiva el estado visual de arrastre.
   * @param event - Evento de drag nativo del DOM
   */
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  /**
   * Maneja el evento de soltar un archivo sobre la zona de drop.
   * Extrae el primer archivo del evento y lo procesa con `handleFile`.
   * @param event - Evento de drop nativo del DOM
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
   * Maneja la selección de archivo mediante el input de tipo file.
   * Extrae el archivo seleccionado y lo procesa con `handleFile`.
   * @param event - Evento de cambio del input file
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  /**
   * Procesa el archivo recibido (ya sea por drag & drop o por input).
   * Valida que sea una imagen y genera una URL de vista previa usando FileReader.
   * Si el archivo no es una imagen, muestra un mensaje de error.
   * @param file - Archivo seleccionado por el usuario
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
   * Confirma la subida de la evidencia seleccionada.
   * Valida que haya una imagen cargada antes de proceder.
   *
   * @remarks
   * En la implementación actual, la subida es simulada (solo muestra un mensaje
   * de éxito sin enviar la imagen al backend).
   */
  subirEvicencia() {
    if (this.imagePreview !== null && this.imagePreview !== '') {
      this.mensajeExito = "Evidencia subida correctamente.";
      this.mensajeError = "";
      this.cd.detectChanges();
    } else {
      this.mensajeError = "Por favor, selecciona una imagen antes de subirla.";
      this.mensajeExito = "";
      this.cd.detectChanges();
    }
  }
}
