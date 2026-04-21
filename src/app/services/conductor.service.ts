import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConductorModel} from '../models/conductor.model';

@Injectable({
  providedIn: 'root',
})
export class ConductorService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getConductores() {
    return this.cliente.get<ConductorModel[]>(this.urlbase + '/conductor/mostrartodo', {observe: 'response'});
  }

  //http://localhost:8080/conductor/crear?cedula=4564564564&nombre=pepe&email=asd%40asd.com&telefono=1231231231&edad=52&inicioTurno=12%3A00%3A00&finalTurno=20%3A00%3A00&salario=1500000&licencia=C2&tipoVehiculo=Camion&experienciaAnios=20&contrasena=Pepe1234%2A

  postConductor(cedula: number, nombre: string, email: string, telefono: number, edad: number, inicioTurno: string, finalTurno: string, salario: number, licencia: string, tipoVehiculo: string, experienciaAnios: number, contrasena: string) {
    const url = this.urlbase + '/conductor/crear?' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'inicioTurno=' + encodeURIComponent(inicioTurno) + '&' +
      'finalTurno=' + encodeURIComponent(finalTurno) + '&' +
      'salario=' + salario + '&' +
      'licencia=' + encodeURIComponent(licencia) + '&' +
      'tipoVehiculo=' + encodeURIComponent(tipoVehiculo) + '&' +
      'experienciaAnios=' + experienciaAnios + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putConductor(id: number, cedula: number, nombre: string, email: string, telefono: number, edad: number, inicioTurno: string, finalTurno: string, salario: number, licencia: string, tipoVehiculo: string, experienciaAnios: number, contrasena: string) {
    const url = this.urlbase + '/conductor/actualizar?' +
      'id=' + id + '&' +
      'cedula=' + cedula + '&' +
      'nombre=' + encodeURIComponent(nombre) + '&' +
      'email=' + encodeURIComponent(email) + '&' +
      'telefono=' + telefono + '&' +
      'edad=' + edad + '&' +
      'inicioTurno=' + encodeURIComponent(inicioTurno) + '&' +
      'finalTurno=' + encodeURIComponent(finalTurno) + '&' +
      'salario=' + salario + '&' +
      'licencia=' + encodeURIComponent(licencia) + '&' +
      'tipoVehiculo=' + encodeURIComponent(tipoVehiculo) + '&' +
      'experienciaAnios=' + experienciaAnios + '&' +
      'contrasena=' + encodeURIComponent(contrasena);

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deleteConductor(id: number) {
    return this.cliente.delete(this.urlbase + '/conductor/eliminar?id=' + id, {responseType: 'text'});
  }

}
