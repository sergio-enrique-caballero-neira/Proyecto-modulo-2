import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ManipuladorModel} from '../models/manipulador.model';

@Injectable({
  providedIn: 'root',
})
export class ManipuladorService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getManipuladores() {
    return this.cliente.get<ManipuladorModel[]>(this.urlbase + '/manipulador/mostrartodo', {observe: 'response'});
  }

  postManipulador(cedula: number, nombre: string, email: string, telefono: number, edad: number, inicioTurno: string, finalTurno: string, salario: number, area: string, paquetesProcesados: number, contrasena: string) {
    const url = this.urlbase + '/manipulador/crear?' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'inicioTurno=' + encodeURIComponent(inicioTurno) + '&' +
      'finalTurno=' + encodeURIComponent(finalTurno) + '&' +
      'salario=' + salario + '&' +
      'area=' + encodeURIComponent(area) + '&' +
      'paquetesProcesados=' + paquetesProcesados + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putManipulador(id: number, cedula: number, nombre: string, email: string, telefono: number, edad: number, inicioTurno: string, finalTurno: string, salario: number, area: string, paquetesProcesados: number, contrasena: string) {
    const url = this.urlbase + '/manipulador/actualizar?' +
      'id=' + id + '&' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'inicioTurno=' + encodeURIComponent(inicioTurno) + '&' +
      'finalTurno=' + encodeURIComponent(finalTurno) + '&' +
      'salario=' + salario + '&' +
      'area=' + encodeURIComponent(area) + '&' +
      'paquetesProcesados=' + paquetesProcesados + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deleteManipulador(id: number) {
    return this.cliente.delete(this.urlbase + '/manipulador/eliminar?id=' + id, {responseType: 'text'});
  }

}
