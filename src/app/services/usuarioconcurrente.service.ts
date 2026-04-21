import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioConcurrenteModel} from '../models/usuarioConcurrente.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioconcurrenteService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getUsuarios() {
    return this.cliente.get<UsuarioConcurrenteModel[]>(this.urlbase + '/usuarioconcurrente/mostrartodo', {observe: 'response'});
  }

  postUsuarioConcurrente(cedula: number, nombre: string, email: string, telefono: number, edad: number, direccion: string, tipoUsuario: string, pedidosMensuales: number, descuento: number, contrasena: string) {
    const url = this.urlbase + '/usuarioconcurrente/crear?' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'direccion=' + encodeURIComponent(direccion) + '&' +
      'tipoUsuario=' + encodeURIComponent(tipoUsuario) + '&' +
      'pedidosMensuales=' + pedidosMensuales + '&' +
      'descuento=' + descuento + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putUsuarioConcurrente(id: number, cedula: number, nombre: string, email: string, telefono: number, edad: number, direccion: string, tipoUsuario: string, pedidosMensuales: number, descuento: number, contrasena: string) {
    const url = this.urlbase + '/usuarioconcurrente/actualizar?' +
      'id=' + id + '&' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'direccion=' + encodeURIComponent(direccion) + '&' +
      'tipoUsuario=' + encodeURIComponent(tipoUsuario) + '&' +
      'pedidosMensuales=' + pedidosMensuales + '&' +
      'descuento=' + descuento + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deleteUsuarioConcurrente(id: number) {
    return this.cliente.delete(this.urlbase + '/usuarioconcurrente/eliminar?id=' + id, {responseType: 'text'});
  }

}
