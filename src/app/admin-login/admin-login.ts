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

/**
 * @component AdminLogin
 * @description Pantalla de autenticación para roles administrativos del sistema:
 * Administrador, Conductor y Manipulador. El usuario selecciona primero su tipo de rol
 * y luego ingresa sus credenciales (nombre y contraseña).
 *
 * La autenticación se realiza del lado del cliente comparando contra la lista completa
 * de usuarios cargada desde el backend al inicializar el componente.
 * Tras un login exitoso, almacena el ID y tipo del usuario en el ModelosTempService
 * y redirige al dashboard administrativo compartido.
 *
 * @selector app-admin-login
 */
@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {

  /** Servicio para obtener la lista de administradores desde el backend. */
  public administradorService = inject(AdministradorService);

  /** Servicio para obtener la lista de conductores desde el backend. */
  public conductorService = inject(ConductorService);

  /** Servicio para obtener la lista de manipuladores desde el backend. */
  public manipuladorService = inject(ManipuladorService);

  /** Servicio para almacenar el modelo de sesión temporal tras el login exitoso. */
  public modelosTempService = inject(ModelosTempService);

  constructor(private router: Router) {}

  /** Lista local de administradores cargada al inicializar, usada para autenticación. */
  administradores: AdministradorModel[] = [];

  /** Lista local de conductores cargada al inicializar, usada para autenticación. */
  conductores: ConductorModel[] = [];

  /** Lista local de manipuladores cargada al inicializar, usada para autenticación. */
  manipuladores: ManipuladorModel[] = [];

  /**
   * @lifecycle ngOnInit
   * @description Carga en paralelo las listas de administradores, conductores y manipuladores
   * desde el backend. Estas listas se usan localmente para validar las credenciales
   * ingresadas por el usuario en el login.
   */
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

  /** Nombre de usuario ingresado en el formulario de login. */
  usuario: string = "";

  /** Contraseña ingresada en el formulario de login. */
  contrasena: string = "";

  /** Indica si se debe mostrar un error por nombre de usuario incorrecto. */
  errorNombre: boolean = false;

  /** Indica si se debe mostrar un error por contraseña incorrecta. */
  errorContrasena: boolean = false;

  /**
   * Sección de rol actualmente seleccionada por el usuario.
   * Se inicializa en 'nada' hasta que el usuario seleccione su rol.
   */
  seccionActiva: string = 'nada';

  /**
   * Indica si el usuario ya seleccionó un rol.
   * Se usa en la plantilla para mostrar u ocultar el formulario de credenciales.
   */
  seleccionado: boolean = false;

  /**
   * Activa la sección del rol seleccionado y habilita la visualización
   * del formulario de credenciales.
   * @param nombre - Identificador del rol seleccionado
   */
  cambiarSeccion(nombre: string) {
    this.seccionActiva = nombre;
    this.seleccionado = true;
  }

  /**
   * Valida las credenciales ingresadas contra la lista del rol activo.
   *
   *Dependiendo lo que pase se valida y guarda el modelo de sesión, o se activan los errores
   * por nombre o por contraseña.
   *
   * @remarks
   * La autenticación se realiza completamente en el cliente iterando sobre
   * las listas precargadas. No existe un endpoint de login dedicado en el backend.
   */
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

  /**
   * Redirige al login de usuarios regulares.
   * Permite al personal administrativo volver a la pantalla de acceso general.
   */
  salir() {
    this.router.navigate(['/login']);
  }

}
