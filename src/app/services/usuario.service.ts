import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioModel} from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private cliente = inject(HttpClient);
  private readonly urlbase:string = "http://localhost:8080";

  getUsuariosConcurrentes(){
    return this.cliente.get<UsuarioModel[]>(this.urlbase+"/usuarioconcurrente/mostrartodo", {observe:'response'});
  }
  getUsuariosNormales(){
    return this.cliente.get<UsuarioModel[]>(this.urlbase+"/usuarionormal/mostrartodo", {observe:'response'});
  }
  getUsuariosPremium(){
    return this.cliente.get<UsuarioModel[]>(this.urlbase+"/usuariopremium/mostrartodo", {observe:'response'});
  }

}
