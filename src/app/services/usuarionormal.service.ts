import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioNormalModel} from '../models/usuarioNormal.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarionormalService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getUsuarios() {
    return this.cliente.get<UsuarioNormalModel[]>(this.urlbase + '/usuarionormal/mostrartodo', {observe: 'response'});
  }

  postUsuarioNormal(cedula: number, nombre: string, email: string, telefono: number, edad: number, direccion: string, tipoUsuario: string, contrasena: string) {
    const url = this.urlbase + '/usuarionormal/crear?' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'direccion=' + encodeURIComponent(direccion) + '&' +
      'tipoUsuario=' + encodeURIComponent(tipoUsuario) + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putUsuarioNormal(id: number, cedula: number, nombre: string, email: string, telefono: number, edad: number, direccion: string, tipoUsuario: string, contrasena: string) {
    const url = this.urlbase + '/usuarionormal/actualizar?' +
      'id=' + id + '&' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'direccion=' + encodeURIComponent(direccion) + '&' +
      'tipoUsuario=' + encodeURIComponent(tipoUsuario) + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deleteUsuarioNormal(id: number) {
    return this.cliente.delete(this.urlbase + '/usuarionormal/eliminar?id=' + id, {responseType: 'text'});
  }

}
