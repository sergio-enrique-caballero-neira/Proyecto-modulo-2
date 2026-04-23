import {ChangeDetectorRef, Component, inject} from '@angular/core';

@Component({
  selector: 'app-conductor-menu-evidencia',
  standalone: false,
  templateUrl: './conductor-menu-evidencia.html',
  styleUrl: './conductor-menu-evidencia.css',
})
export class ConductorMenuEvidencia {

  imagePreview: string | ArrayBuffer | null = null;
  isDragging = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  private cd = inject(ChangeDetectorRef);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

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
