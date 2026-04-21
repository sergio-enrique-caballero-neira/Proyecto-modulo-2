import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdministradorModel} from '../models/administrador.model';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getAdministradores() {
    return this.cliente.get<AdministradorModel[]>(this.urlbase + '/administrador/mostrartodo', {observe: 'response'});
  }

  postAdministrador(cedula: number, nombre: string, email: string, telefono: number, edad: number, inicioTurno: string, finalTurno: string, salario: number, rol: string, accesoTotal: boolean, contrasena: string) {
    const url = this.urlbase + '/administrador/crear?' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'inicioTurno=' + encodeURIComponent(inicioTurno) + '&' +
      'finalTurno=' + encodeURIComponent(finalTurno) + '&' +
      'salario=' + salario + '&' +
      'rol=' + encodeURIComponent(rol) + '&' +
      'accesoTotal=' + accesoTotal + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putAdministrador(id: number, cedula: number, nombre: string, email: string, telefono: number, edad: number, inicioTurno: string, finalTurno: string, salario: number, rol: string, accesoTotal: boolean, contrasena: string) {
    const url = this.urlbase + '/administrador/actualizar?' +
      'id=' + id + '&' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'inicioTurno=' + encodeURIComponent(inicioTurno) + '&' +
      'finalTurno=' + encodeURIComponent(finalTurno) + '&' +
      'salario=' + salario + '&' +
      'rol=' + encodeURIComponent(rol) + '&' +
      'accesoTotal=' + accesoTotal + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deleteAdministrador(id: number) {
    return this.cliente.delete(this.urlbase + '/administrador/eliminar?id=' + id, {responseType: 'text'});
  }

}
