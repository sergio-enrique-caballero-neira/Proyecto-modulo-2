import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CartaService} from '../../../services/carta.service';
import {CartaModel} from '../../../models/carta.model';

@Component({
  selector: 'app-admin-menu-carta',
  standalone: false,
  templateUrl: './admin-menu-carta.html',
  styleUrl: './admin-menu-carta.css',
})
export class AdminMenuCarta {
  private readonly cartaService = inject(CartaService);
  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoCarta: boolean = false;
  actualizandoCarta: boolean = false;
  eliminandoCarta: boolean = false;
  cargandoCartas: boolean = false;
  cartas: CartaModel[] = [];

  id: number = -1;
  descripcion: string = '';
  peso: number = 0;
  origen: string = '';
  destino: string = '';
  fechaEnvio: string = '';
  tamano: string = '';

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();
    if (menu === 'mostrar') {
      this.cargarCartas();
    }
  }

  crearCarta(): void {
    this.limpiarMensajes();
    this.creandoCarta = true;
    this.cartaService.postCarta(this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.tamano).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Carta creada correctamente.';
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

  actualizarCarta(): void {
    this.limpiarMensajes();
    this.actualizandoCarta = true;
    this.cartaService.putCarta(
      this.id, this.descripcion, this.peso, this.origen, this.destino, this.fechaEnvio, this.tamano
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Carta actualizada correctamente.';
        this.actualizandoCarta = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoCarta = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo actualizar la carta.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarCarta(): void {
    this.limpiarMensajes();
    this.eliminandoCarta = true;
    this.cartaService.deleteCarta(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Carta eliminada correctamente.';
        this.eliminandoCarta = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoCarta = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo eliminar la carta.';
        this.cd.detectChanges();
      }
    });
  }

  cargarCartas(): void {
    this.cargandoCartas = true;
    this.cartaService.getCartas().subscribe({
      next: (respuesta) => {
        if (respuesta.body) {
          this.cartas = respuesta.body;
        }
        this.cargandoCartas = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoCartas = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error : 'No se pudo obtener la lista de cartas.';
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

  volverAlMenuPrincipal(): void {
    this.menu = 'principal';
    this.limpiarMensajes();
    this.limpiarFormulario();
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
