import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioPremiumModel} from '../models/usuarioPremium.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariopremiumService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getUsuarios() {
    return this.cliente.get<UsuarioPremiumModel[]>(this.urlbase + '/usuariopremium/mostrartodo', {observe: 'response'});
  }

  postUsuarioPremium(cedula: number, nombre: string, email: string, telefono: number, edad: number, direccion: string, tipoUsuario: string, descuento: number, contrasena: string) {
    const url = this.urlbase + '/usuariopremium/crear?' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'direccion=' + encodeURIComponent(direccion) + '&' +
      'tipoUsuario=' + encodeURIComponent(tipoUsuario) + '&' +
      'descuento=' + descuento + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putUsuarioPremium(id: number, cedula: number, nombre: string, email: string, telefono: number, edad: number, direccion: string, tipoUsuario: string, descuento: number, contrasena: string) {
    const url = this.urlbase + '/usuariopremium/actualizar?' +
      'id=' + id + '&' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'direccion=' + encodeURIComponent(direccion) + '&' +
      'tipoUsuario=' + encodeURIComponent(tipoUsuario) + '&' +
      'descuento=' + descuento + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deleteUsuarioPremium(id: number) {
    return this.cliente.delete(this.urlbase + '/usuariopremium/eliminar?id=' + id, {responseType: 'text'});
  }

}
