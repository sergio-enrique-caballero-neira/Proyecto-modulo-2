import {Component, inject, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import {AdministradorModel} from '../models/administrador.model';
import {ConductorModel} from '../models/conductor.model';
import {ManipuladorModel} from '../models/manipulador.model';
import {AdministradorService} from '../services/administrador.service';
import {ConductorService} from '../services/conductor.service';
import {ManipuladorService} from '../services/manipulador.service';
import {Router} from '@angular/router';
import {ModelosTempService} from '../services/modelosTemp.service';
import {ModeloTempModel} from '../models/modeloTemp.model';

/**
 * @component AdminDashboard
 * @description Panel principal para roles administrativos del sistema.
 * Determina el tipo de usuario autenticado (Administrador, Conductor o Manipulador)
 * a partir del modelo temporal de sesión, carga sus datos desde el backend
 * y configura el menú inicial correspondiente a su rol.
 *
 * @selector app-admin-dashboard
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  constructor(private router: Router) {
  }


  /** Servicio para forzar la detección de cambios manualmente en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Servicio para operaciones CRUD sobre administradores. Expuesto como público para uso en la plantilla. */
  public administradorService = inject(AdministradorService);

  /** Servicio para operaciones CRUD sobre conductores. Expuesto como público para uso en la plantilla. */
  public conductorService = inject(ConductorService);

  /** Servicio para operaciones CRUD sobre manipuladores. Expuesto como público para uso en la plantilla. */
  public manipuladorService = inject(ManipuladorService);

  /** Servicio de modelo temporal de sesión. */
  public modelosTempService = inject(ModelosTempService);

  /**
   * Datos completos del usuario autenticado.
   * Puede ser un Administrador, Conductor o Manipulador según el tipo de sesión.
   * Se mantiene como null hasta que la carga desde el backend se complete.
   */
  admin: AdministradorModel | ConductorModel | ManipuladorModel | null = null;

  /** Modelo temporal que contiene los datos básicos de la sesión activa. */
  tempModel!: ModeloTempModel;

  /** Nombre del usuario autenticado, cargado desde el backend. */
  nombre: string = '';

  /** ID del usuario autenticado. */
  id: number = 0;

  /**
   * Tipo de usuario administrativo activo.
   * Valores posibles: 'Administrador', 'Conductor', 'Manipulador'.
   */
  tipoAdministrativo: string = '';

  /**
   * Indica si los datos del usuario ya fueron cargados exitosamente desde el backend.
   * Se usa para controlar loaders o la visibilidad de secciones en la plantilla.
   */
  cargado: boolean = false;

  /**
   * Controla qué subcomponente o sección se muestra dentro del dashboard.
   * Se inicializa vacío y se asigna según el rol tras la carga de datos.
   */
  menu: string = "";

  /**
   * @lifecycle ngOnInit
   * @description Recupera el modelo de sesión temporal e identifica el tipo de usuario.
   * Según el tipo, consulta el servicio correspondiente, busca el registro por ID
   * y configura el menú inicial del dashboard.
   */
  ngOnInit() {

    this.tempModel = this.modelosTempService.getModelo();

    this.tipoAdministrativo = this.tempModel.tipo;

    if (this.tempModel.tipo === 'Administrador') {
      this.administradorService.getAdministradores().subscribe({
        next: (usu) => {
          const encontrado = usu.body?.find(u => u.id === this.tempModel.id)

          if (encontrado !== undefined) {
            this.id = encontrado.id;
            this.admin = encontrado;
            this.nombre = encontrado.nombre;
            this.cargado = true;
            this.tipoAdministrativo = encontrado.rol;
            this.menu = "administrador-principal";
            this.cd.detectChanges();
          }
        },
        error: (err) => {
          console.log("No hay usuarios", err);
        }
      });
    } else if (this.tempModel.tipo === 'Conductor') {
      this.conductorService.getConductores().subscribe({
        next: (usu) => {
          const encontrado = usu.body?.find(u => u.id === this.tempModel.id);

          if (encontrado !== undefined) {
            this.id = encontrado.id;
            this.admin = encontrado;
            this.nombre = encontrado.nombre;
            this.cargado = true;
            this.menu = "conductor-principal";
            this.cd.detectChanges();
          }
        },
        error: (err) => {
          console.log("No hay usuarios", err);
        }
      });
    } else if (this.tempModel.tipo === 'Manipulador') {
      this.manipuladorService.getManipuladores().subscribe({
        next: (usu) => {
          const encontrado = usu.body?.find(u => u.id === this.tempModel.id);

          if (encontrado !== undefined) {
            this.id = encontrado.id;
            this.admin = encontrado;
            this.nombre = encontrado.nombre;
            this.cargado = true;
            this.menu = "manipulador-principal";
            this.cd.detectChanges();
          }
        },
        error: (err) => {
          console.log("No hay usuarios", err);
        }
      });
    }

  }

  /**
   * Cambia la sección activa del dashboard.
   * @param menu - Identificador de la sección a mostrar
   */
  seleccionarMenu(menu: string) {
    this.menu = menu;
  }

  /**
   * Maneja la acción de retroceso o cierre de sesión según el estado actual del menú.
   *
   * Si el usuario que sea no esta en su menú acorde, vuelve al principal y si ya esta en su menú
   * lo redirige al login administrativo.
   */
  salir() {
    if (this.tipoAdministrativo !== "Conductor" && this.tipoAdministrativo !== "Manipulador" && this.menu !== "administrador-principal") {
      this.menu = "administrador-principal";
    } else if (this.tipoAdministrativo === "Conductor" && this.menu !== "conductor-principal") {
      this.menu = "conductor-principal";
    } else if (this.tipoAdministrativo === "Manipulador" && this.menu !== "manipulador-principal") {
      this.menu = "manipulador-principal";
    } else {
      this.router.navigate(['/admin-login']);
    }
  }

}
