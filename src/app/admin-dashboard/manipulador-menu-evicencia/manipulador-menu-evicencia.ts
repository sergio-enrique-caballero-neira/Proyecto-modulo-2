import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {ManipuladorService} from '../../services/manipulador.service';

@Component({
  selector: 'app-manipulador-menu-evicencia',
  standalone: false,
  templateUrl: './manipulador-menu-evicencia.html',
  styleUrl: './manipulador-menu-evicencia.css',
})
export class ManipuladorMenuEvicencia {

  private readonly manipuladorService = inject(ManipuladorService);
  private cd = inject(ChangeDetectorRef);

  mensajeExito: string = '';
  mensajeError: string = '';
  actualizandoManipulador: boolean = false;

  @Input() id: number = -1;
  cedula: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: number = 0;
  edad: number = 0;
  inicioTurno: string = '';
  finalTurno: string = '';
  salario: number = 0;
  area: string = '';
  paquetesProcesados: number = 0;
  contrasena: string = '';

  paquenesNuevos: number = 0;

  imagePreview: string | ArrayBuffer | null = null;
  isDragging = false;

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
