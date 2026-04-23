import {ChangeDetectorRef, Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioconcurrenteService} from '../services/usuarioconcurrente.service';
import {UsuarionormalService} from '../services/usuarionormal.service';
import {UsuariopremiumService} from '../services/usuariopremium.service';
import {ModelosTempService} from '../services/modelosTemp.service';
import {ModeloTempModel} from '../models/modeloTemp.model';

@Component({
  selector: 'app-usuarios-dashboard',
  standalone: false,
  templateUrl: './usuarios-dashboard.html',
  styleUrl: './usuarios-dashboard.css',
})
export class UsuariosDashboard {

  constructor(private router: Router) {}

  private cd = inject(ChangeDetectorRef);

  private usuarioConcurrenteService = inject(UsuarioconcurrenteService);
  private usuarioNormalService = inject(UsuarionormalService);
  private usuarioPremiumService = inject(UsuariopremiumService);

  public modelosTempService = inject(ModelosTempService);

  tempModel!: ModeloTempModel;

  nombre: string = '';
  id: number = 0;
  tipoUsuario: string = '';
  cargado: boolean = false;
  menu: string = "usuario-principal";

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

  seleccionarMenu(menu: string) {
    this.menu = menu;
  }

  salir() {
    if (this.menu === "usuario-paquetes-alimencicios" || this.menu === "usuario-paquetes-no-alimencicios" || this.menu === "usuario-paquetes-carta") {
      this.menu = "usuario-principal";
    } else {
      this.router.navigate(['/login']);
    }
  }

}
