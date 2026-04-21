import {Component, inject, ChangeDetectorRef} from '@angular/core';
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
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  private cd = inject(ChangeDetectorRef);

  public administradorService = inject(AdministradorService);
  public conductorService = inject(ConductorService);
  public manipuladorService = inject(ManipuladorService);
  public modelosTempService = inject(ModelosTempService);

  admin: AdministradorModel | ConductorModel | ManipuladorModel | null = null;
  tempModel!: ModeloTempModel;
  nombre: string = '';
  id: number = 0;
  tipoAdministrativo: string = '';
  cargado: boolean = false;

  ngOnInit() {

    this.tempModel = this.modelosTempService.getModelo();

    this.tipoAdministrativo = this.tempModel.tipo;

    if (this.tempModel.tipo === 'Administrador') {
      this.administradorService.getAdministradores().subscribe({
        next: (usu) => {
          const encontrado  = usu.body?.find(u => u.id === this.tempModel.id)

          if (encontrado !== undefined) {
            this.id = encontrado.id;
            this.admin = encontrado;
            this.nombre = encontrado.nombre;
            this.cargado = true;
            this.tipoAdministrativo = encontrado.rol;
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
            this.cd.detectChanges();
          }
        },
        error: (err) => {
          console.log("No hay usuarios", err);
        }
      });
    }

  }

}
