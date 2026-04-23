import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AdministradorModel} from '../models/administrador.model';
import {ConductorModel} from '../models/conductor.model';
import {ManipuladorModel} from '../models/manipulador.model';
import {AdministradorService} from '../services/administrador.service';
import {ConductorService} from '../services/conductor.service';
import {ManipuladorService} from '../services/manipulador.service';
import {Router} from '@angular/router';
import {ModelosTempService} from '../services/modelosTemp.service';
import {ModeloTempModel} from '../models/modeloTemp.model';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {

  public administradorService = inject(AdministradorService);
  public conductorService = inject(ConductorService);
  public manipuladorService = inject(ManipuladorService);
  public modelosTempService = inject(ModelosTempService);

  constructor(private router: Router) {}

  administradores: AdministradorModel[] = [];
  conductores: ConductorModel[] = [];
  manipuladores: ManipuladorModel[] = [];

  ngOnInit() {
    this.administradorService.getAdministradores().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.administradores = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });

    this.conductorService.getConductores().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.conductores = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });

    this.manipuladorService.getManipuladores().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.manipuladores = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuario", err);
      }
    });
  }

  usuario: string = "";
  contrasena: string = "";

  errorNombre: boolean = false;
  errorContrasena: boolean = false;

  seccionActiva: string = 'nada'
  seleccionado: boolean = false;

  cambiarSeccion(nombre: string) {
    this.seccionActiva = nombre;
    this.seleccionado = true;
  }

  login(): void {

    if (this.seccionActiva == 'administrativo') {

      for (let administrador of this.administradores) {
        if (administrador.nombre === this.usuario && administrador.contrasena === this.contrasena) {
          this.modelosTempService.setModelo({id: administrador.id, tipo: 'Administrador'} as ModeloTempModel);
          this.router.navigate(['/admin-dashboard']);
          return;
        } else if (administrador.nombre === this.usuario && administrador.contrasena !== this.contrasena) {
          this.errorContrasena = true;
          return;
        } else if (administrador.nombre !== this.usuario && administrador.contrasena === this.contrasena) {
          this.errorNombre = true;
          return;
        } else {
          this.errorNombre = true;
          this.errorContrasena = true;
        }
      }

    } else if (this.seccionActiva == 'conductor') {

      for (let conductor of this.conductores) {
        if (conductor.nombre === this.usuario && conductor.contrasena === this.contrasena) {
          this.modelosTempService.setModelo({id: conductor.id, tipo: 'Conductor'} as ModeloTempModel);
          this.router.navigate(['/admin-dashboard']);
          return;
        }
        else if (conductor.nombre === this.usuario && conductor.contrasena !== this.contrasena) {
          this.errorContrasena = true;
          return;
        }
        else if (conductor.nombre !== this.usuario && conductor.contrasena === this.contrasena) {
          this.errorNombre = true;
          return;
        }
        else {
          this.errorNombre = true;
          this.errorContrasena = true;
        }
      }

    } else if (this.seccionActiva == 'manipulador') {
      for (let manipulador of this.manipuladores) {
        if (manipulador.nombre === this.usuario && manipulador.contrasena === this.contrasena) {
          this.modelosTempService.setModelo({id: manipulador.id, tipo: 'Manipulador'} as ModeloTempModel);
          this.router.navigate(['/admin-dashboard']);
          return;
        }
        else if (manipulador.nombre === this.usuario && manipulador.contrasena !== this.contrasena) {
          this.errorContrasena = true;
          return;
        }
        else if (manipulador.nombre !== this.usuario && manipulador.contrasena === this.contrasena) {
          this.errorNombre = true;
          return;
        }
        else {
          this.errorNombre = true;
          this.errorContrasena = true;
        }
      }
    }

  }

  salir() {
    this.router.navigate(['/login']);
  }

}
