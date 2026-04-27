import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioConcurrenteModel} from '../models/usuarioConcurrente.model';
import {UsuarioNormalModel} from '../models/usuarioNormal.model';
import {UsuarioPremiumModel} from '../models/usuarioPremium.model';
import {UsuarioconcurrenteService} from '../services/usuarioconcurrente.service';
import {UsuarionormalService} from '../services/usuarionormal.service';
import {UsuariopremiumService} from '../services/usuariopremium.service';
import {ModelosTempService} from '../services/modelosTemp.service';
import {ModeloTempModel} from '../models/modeloTemp.model';

/**
 * @component Login
 * @description Pantalla de autenticación principal para usuarios del sistema
 * (Normal, Concurrente y Premium). Carga al iniciar las listas de los tres tipos
 * de usuario desde el backend y valida las credenciales localmente.
 *
 * Tras un login exitoso, almacena el ID y tipo del usuario en el ModelosTempService
 * y redirige al dashboard de usuarios.
 *
 * @selector app-login
 */
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) {}

  /** Servicio para obtener la lista de usuarios concurrentes desde el backend. */
  public usuarioConcurrenteService = inject(UsuarioconcurrenteService);

  /** Servicio para obtener la lista de usuarios normales desde el backend. */
  public usuarioNormalService = inject(UsuarionormalService);

  /** Servicio para obtener la lista de usuarios premium desde el backend. */
  public usuarioPremiumService = inject(UsuariopremiumService);

  /** Servicio para almacenar el modelo de sesión temporal tras el login exitoso. */
  public modelosTempService = inject(ModelosTempService);

  /** Nombre de usuario ingresado en el formulario de login. */
  usuario: string = "";

  /** Contraseña ingresada en el formulario de login. */
  contrasena: string = "";

  /** Lista local de usuarios concurrentes cargada al inicializar, usada para autenticación. */
  usuariosConcurrentes: UsuarioConcurrenteModel[] = [];

  /** Lista local de usuarios normales cargada al inicializar, usada para autenticación. */
  usuariosNormales: UsuarioNormalModel[] = [];

  /** Lista local de usuarios premium cargada al inicializar, usada para autenticación. */
  usuariosPremium: UsuarioPremiumModel[] = [];

  /** Indica si se debe mostrar un error por nombre de usuario incorrecto. */
  errorNombre: boolean = false;

  /** Indica si se debe mostrar un error por contraseña incorrecta. */
  errorContrasena: boolean = false;

  /**
   * @lifecycle ngOnInit
   * @description Carga en paralelo las listas de los tres tipos de usuario desde el backend.
   * Estas listas se usan localmente para validar las credenciales en el método `login()`.
   */
  ngOnInit() {
    this.usuarioConcurrenteService.getUsuarios().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuariosConcurrentes = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });

    this.usuarioNormalService.getUsuarios().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuariosNormales = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuarios", err);
      }
    });

    this.usuarioPremiumService.getUsuarios().subscribe({
      next: (usu) => {
        if (usu.body) {
          this.usuariosPremium = usu.body;
        }
      },
      error: (err) => {
        console.log("No hay usuario", err);
      }
    });
  }

  /**
   * Valida las credenciales ingresadas contra las listas de los tres tipos de usuario.
   *
   *
   * Dependiendo del nombre y contraseña que se logeen, guaradara el modelo de sesión
   * y navegara por el dashboard, si no saltaran los errores dependiendo el tipo de error,
   * por nombre o contraseña.
   *
   * @remarks
   * La autenticación se realiza completamente en el cliente. No existe un endpoint
   * de login dedicado en el backend. Si ninguna lista contiene las credenciales,
   * los flags de error quedarán activos sin ningún mensaje adicional.
   */
  login(): void {

    if (this.usuario === "admin" && this.contrasena === "admin") {
      this.router.navigate(['/admin-login']);
      return;
    }

    for (let usuario of this.usuariosConcurrentes) {
      if (usuario.nombre === this.usuario && usuario.contrasena === this.contrasena) {
        this.modelosTempService.setModelo({id: usuario.id, tipo: 'UsuarioConcurrente'} as ModeloTempModel);
        this.router.navigate(['/usuarios-dashboard']);
        return;
      }
      else if (usuario.nombre === this.usuario && usuario.contrasena !== this.contrasena) {
        this.errorContrasena = true;
        return;
      }
      else if (usuario.nombre !== this.usuario && usuario.contrasena === this.contrasena) {
        this.errorNombre = true;
        return;
      }
      else {
        this.errorNombre = true;
        this.errorContrasena = true;
      }
    }

    for (let usuario of this.usuariosNormales) {
      if (usuario.nombre === this.usuario && usuario.contrasena === this.contrasena) {
        this.modelosTempService.setModelo({id: usuario.id, tipo: 'UsuarioNormal'} as ModeloTempModel);
        this.router.navigate(['/usuarios-dashboard']);
        return;
      }
      else if (usuario.nombre === this.usuario && usuario.contrasena !== this.contrasena) {
        this.errorContrasena = true;
        return;
      }
      else if (usuario.nombre !== this.usuario && usuario.contrasena === this.contrasena) {
        this.errorNombre = true;
        return;
      }
      else {
        this.errorNombre = true;
        this.errorContrasena = true;
      }
    }

    for (let usuario of this.usuariosPremium) {
      if (usuario.nombre === this.usuario && usuario.contrasena === this.contrasena) {
        this.modelosTempService.setModelo({id: usuario.id, tipo: 'UsuarioPremium'} as ModeloTempModel);
        this.router.navigate(['/usuarios-dashboard']);
        return;
      }
      else if (usuario.nombre === this.usuario && usuario.contrasena !== this.contrasena) {
        this.errorContrasena = true;
        return;
      }
      else if (usuario.nombre !== this.usuario && usuario.contrasena === this.contrasena) {
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
