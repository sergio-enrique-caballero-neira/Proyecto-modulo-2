import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioconcurrenteService} from '../services/usuarioconcurrente.service';
import {UsuarionormalService} from '../services/usuarionormal.service';
import {UsuariopremiumService} from '../services/usuariopremium.service';
import {ModelosTempService} from '../services/modelosTemp.service';
import {ModeloTempModel} from '../models/modeloTemp.model';

/**
 * @component UsuariosDashboard
 * @description Panel principal del usuario autenticado.
 * Determina el tipo de usuario (Normal, Concurrente o Premium) a partir del
 * modelo temporal de sesión y carga sus datos desde el servicio correspondiente.
 * También controla la navegación interna del dashboard mediante un sistema de menú.
 *
 * @selector app-usuarios-dashboard
 */

@Component({
  selector: 'app-usuarios-dashboard',
  standalone: false,
  templateUrl: './usuarios-dashboard.html',
  styleUrl: './usuarios-dashboard.css',
})
export class UsuariosDashboard {

  constructor(private router: Router) {}

  /** Servicio para forzar la detección de cambios manualmente en la vista. */
  private cd = inject(ChangeDetectorRef);

  /** Servicio para operaciones con usuarios de tipo Concurrente. */
  private usuarioConcurrenteService = inject(UsuarioconcurrenteService);

  /** Servicio para operaciones con usuarios de tipo Normal. */
  private usuarioNormalService = inject(UsuarionormalService);

  /** Servicio para operaciones con usuarios de tipo Premium. */
  private usuarioPremiumService = inject(UsuariopremiumService);

  /** Servicio de modelo temporal de sesión. */
  public modelosTempService = inject(ModelosTempService);

  /** Modelo temporal que contiene los datos básicos de la sesión activa.  */
  tempModel!: ModeloTempModel;


  /** Nombre del usuario autenticado. */
  nombre: string = '';

  /** ID del usuario autenticado. */
  id: number = 0;

  /** Tipo de usuario activo: 'UsuarioNormal', 'UsuarioConcurrente' o 'UsuarioPremium' */
  tipoUsuario: string = '';

  /**
   * Indica si los datos del usuario ya fueron cargados exitosamente desde el backend.
   * Se usa para controlar la visibilidad de elementos en la plantilla.
   */
  cargado: boolean = false;

  /**
   * Controla qué subcomponente o sección se muestra dentro del dashboard.
   * Valor por defecto: 'usuario-principal'.
   */
  menu: string = "usuario-principal";

  /**
   * @lifecycle ngOnInit
   * @description Inicializa el dashboard recuperando el modelo de sesión temporal
   * y consultando al backend los datos del usuario según su tipo.
   * Itera sobre la lista de usuarios retornada para encontrar el que coincide con el ID de sesión.
   */
  ngOnInit() {

    this.tempModel = this.modelosTempService.getModelo();
    this.tipoUsuario = this.tempModel.tipo;

    if(this.tipoUsuario === 'UsuarioConcurrente') {
      this.usuarioConcurrenteService.getUsuarios().subscribe({
        next: (usu) => {
          if (usu.body) {
            for (let usuario of usu.body) {
              if (usuario.id === this.tempModel.id) {
                this.id = usuario.id;
                this.nombre = usuario.nombre;
                this.cargado = true;
                this.cd.detectChanges();
                break;
              }
            }
          }
        },
        error: (err) => {
          console.log("No hay usuarios", err);
        }
      });
    }

    if(this.tipoUsuario === 'UsuarioNormal') {
      this.usuarioNormalService.getUsuarios().subscribe({
        next: (usu) => {
          if (usu.body) {
            for (let usuario of usu.body) {
              if (usuario.id === this.tempModel.id) {
                this.id = usuario.id;
                this.nombre = usuario.nombre;
                this.cargado = true;
                this.cd.detectChanges();
                break;
              }
            }
          }
        },
        error: (err) => {
          console.log("No hay usuarios", err);
        }
      });
    }

    if(this.tipoUsuario === 'UsuarioPremium') {
      this.usuarioPremiumService.getUsuarios().subscribe({
        next: (usu) => {
          if (usu.body) {
            for (let usuario of usu.body) {
              if (usuario.id === this.tempModel.id) {
                this.id = usuario.id;
                this.nombre = usuario.nombre;
                this.cargado = true;
                this.cd.detectChanges();
              }
            }
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
   * Maneja la acción de salida o retroceso en el dashboard.
   * - Si el usuario está en una subsección de envíos, regresa al menú principal del dashboard.
   * - Si está en el menú principal, redirige a la pantalla de login.
   */
  salir() {
    if (this.menu === "usuario-paquetes-alimencicios" || this.menu === "usuario-paquetes-no-alimencicios" || this.menu === "usuario-paquetes-carta") {
      this.menu = "usuario-principal";
    } else {
      this.router.navigate(['/login']);
    }
  }

}
