import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CartaService} from '../../services/carta.service';

@Component({
  selector: 'app-usuarios-menu-cartas',
  standalone: false,
  templateUrl: './usuarios-menu-cartas.html',
  styleUrl: './usuarios-menu-cartas.css',
})

export class UsuariosMenuCartas {

  private readonly cartaService = inject(CartaService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoCarta: boolean = false;

  id: number = -1;
  descripcion: string = '';
  peso: number = 0;
  origen: string = '';
  destino: string = '';
  fechaEnvio: string = '';
  tamano: string = '';

  crearCarta(): void {
    this.limpiarMensajes();
    this.creandoCarta = true;
    this.cartaService.postCarta(this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.tamano).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Carta Enviada correctamente.';
        this.creandoCarta = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoCarta = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo crear la carta.';
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
    this.tamano = '';
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

}
