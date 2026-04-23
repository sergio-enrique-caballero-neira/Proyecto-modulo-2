import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {PaquetenoalimenticioService} from '../../services/paquetenoalimenticio.service';

@Component({
  selector: 'app-usuarios-menu-paquetes-no-alimenticios',
  standalone: false,
  templateUrl: './usuarios-menu-paquetes-no-alimenticios.html',
  styleUrl: './usuarios-menu-paquetes-no-alimenticios.css',
})
export class UsuariosMenuPaquetesNoAlimenticios {

  private readonly paqueteNoAlimenticioService = inject(PaquetenoalimenticioService);
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
  fragil: boolean = false;

  crearPaqueteNoAlimenticio(): void {
    this.limpiarMensajes();
    this.creandoPaquete = true;
    this.paqueteNoAlimenticioService.postPaqueteNoAlimenticio(
      this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.fragil
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Paquete no alimenticio Enviado correctamente.';
        this.creandoPaquete = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoPaquete = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear el paquete no alimenticio.';
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
    this.fragil = false;
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
