import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {UsuariopremiumService} from '../../../services/usuariopremium.service';
import {UsuarioPremiumModel} from '../../../models/usuarioPremium.model';

@Component({
  selector: 'app-admin-menu-usuario-premium',
  standalone: false,
  templateUrl: './admin-menu-usuario-premium.html',
  styleUrl: './admin-menu-usuario-premium.css',
})
export class AdminMenuUsuarioPremium {

  private readonly usuarioPremiumService = inject(UsuariopremiumService);

  private cd = inject(ChangeDetectorRef);

  menu: string = 'principal';
  mensajeExito: string = '';
  mensajeError: string = '';
  creandoUsuario: boolean = false;
  actualizandoUsuario: boolean = false;
  eliminandoUsuario: boolean = false;
  cargandoUsuarios: boolean = false;
  usuariosPremium: UsuarioPremiumModel[] = [];

  id: number = -1;
  cedula: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: number = 0;
  edad: number = 0;
  direccion: string = '';
  tipoUsuario: string = 'PREMIUM';
  descuento: number = 0;
  contrasena: string = '';

  seleccionarMenu(menu: string): void {
    this.menu = menu;
    this.limpiarMensajes();

    if (menu === 'mostrar') {
      this.cargarUsuariosPremium();
    }
  }

  crearUsuarioPremium(): void {
    this.limpiarMensajes();
    this.creandoUsuario = true;

    this.usuarioPremiumService.postUsuarioPremium(
      this.cedula,
      this.nombre,
      this.email,
      this.telefono,
      this.edad,
      this.direccion,
      this.tipoUsuario,
      this.descuento,
      this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario premium creado correctamente.';
        this.creandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.creandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== '' ? error.error
          : 'No se pudo crear el usuario premium.';
        this.cd.detectChanges();
      }
    });
  }

  actualizarUsuarioPremium(): void {
    this.limpiarMensajes();
    this.actualizandoUsuario = true;

    this.usuarioPremiumService.putUsuarioPremium(
      this.id,
      this.cedula,
      this.nombre,
      this.email,
      this.telefono,
      this.edad,
      this.direccion,
      this.tipoUsuario,
      this.descuento,
      this.contrasena
    ).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario premium actualizado correctamente.';
        this.actualizandoUsuario = false;
        this.limpiarFormulario();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.actualizandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== ''
          ? error.error
          : 'No se pudo actualizar el usuario premium.';
        this.cd.detectChanges();
      }
    });
  }

  eliminarUsuarioPremium(): void {
    this.limpiarMensajes();
    this.eliminandoUsuario = true;

    this.usuarioPremiumService.deleteUsuarioPremium(this.id).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta || 'Usuario premium eliminado correctamente.';
        this.eliminandoUsuario = false;
        this.id = -1;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.eliminandoUsuario = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== ''
          ? error.error
          : 'No se pudo eliminar el usuario premium.';
        this.cd.detectChanges();
      }
    });
  }

  cargarUsuariosPremium(): void {
    this.cargandoUsuarios = true;

    this.usuarioPremiumService.getUsuarios().subscribe({
      next: (respuesta) => {
        this.usuariosPremium = respuesta.body ?? [];
        this.cargandoUsuarios = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        this.cargandoUsuarios = false;
        this.mensajeError = typeof error?.error === 'string' && error.error.trim() !== ''
          ? error.error
          : 'No se pudo obtener la lista de usuarios premium.';
        this.cd.detectChanges();
      }
    });
  }

  limpiarFormulario(): void {
    this.id = -1;
    this.cedula = 0;
    this.nombre = '';
    this.email = '';
    this.telefono = 0;
    this.edad = 0;
    this.direccion = '';
    this.tipoUsuario = 'PREMIUM';
    this.descuento = 0;
    this.contrasena = '';
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
