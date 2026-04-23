import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {PaquetealimenticioService} from '../../services/paquetealimenticio.service';

@Component({
  selector: 'app-usuarios-menu-paquetes-alimenticios',
  standalone: false,
  templateUrl: './usuarios-menu-paquetes-alimenticios.html',
  styleUrl: './usuarios-menu-paquetes-alimenticios.css',
})
export class UsuariosMenuPaquetesAlimenticios {

  private readonly paqueteAlimenticioService = inject(PaquetealimenticioService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoPaquete: boolean = false;

  id: number = -1;
  descripcion: string = '';
  peso: number = 0;
  origen: string = '';
  destino: string = '';
  fechaEnvio: string = '';
  refrigerado: boolean = false;

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

  limpiarFormulario(): void {
    this.id = -1;
    this.descripcion = '';
    this.peso = 0;
    this.origen = '';
    this.destino = '';
    this.fechaEnvio = '';
    this.refrigerado = false;
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
