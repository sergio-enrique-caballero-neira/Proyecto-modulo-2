import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {ConductorService} from '../../services/conductor.service';

@Component({
  selector: 'app-conductor-menu-actualizar',
  standalone: false,
  templateUrl: './conductor-menu-actualizar.html',
  styleUrl: './conductor-menu-actualizar.css',
})
export class ConductorMenuActualizar {

  private readonly conductorService = inject(ConductorService);
  private cd = inject(ChangeDetectorRef);

  mensajeExito: string = '';
  mensajeError: string = '';
  actualizandoConductor: boolean = false;

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
  licencia: string = '';
  tipoVehiculo: string = '';
  experienciaAnios: number = 0;
  contrasena: string = '';

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

  limpiarFormulario(): void {
    this.email = '';
    this.telefono = 0;
    this.licencia = '';
    this.tipoVehiculo = '';
    this.contrasena = '';
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
