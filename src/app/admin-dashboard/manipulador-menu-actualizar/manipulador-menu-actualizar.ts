import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {ManipuladorService} from '../../services/manipulador.service';

@Component({
  selector: 'app-manipulador-menu-actualizar',
  standalone: false,
  templateUrl: './manipulador-menu-actualizar.html',
  styleUrl: './manipulador-menu-actualizar.css',
})
export class ManipuladorMenuActualizar {

  private readonly manipuladorService = inject(ManipuladorService);
  private cd = inject(ChangeDetectorRef);

  mensajeExito: string = '';
  mensajeError: string = '';
  actualizandoManipulador: boolean = false;

  cargado:boolean = false;

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

  limpiarFormulario(): void {
    this.email = '';
    this.telefono = 0;
    this.contrasena = '';
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
