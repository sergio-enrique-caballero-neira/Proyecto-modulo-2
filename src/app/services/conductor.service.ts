import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConductorModel} from '../models/conductor.model';

/**
 * @service ConductorService
 * @description Servicio para gestionar las operaciones CRUD del recurso Conductor
 * contra el backend REST. Un conductor es un empleado responsable del transporte
 * de paquetes y cartas; se identifica por su licencia, tipo de vehículo y años
 * de experiencia, además de los datos laborales comunes (turno y salario).
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class ConductorService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de conductores registrados en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `ConductorModel`.
   */
  getConductores() {
    return this.cliente.get<ConductorModel[]>(this.urlbase + '/conductor/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea un nuevo conductor en el sistema.
   *
   * @param cedula - Número de cédula de identidad del conductor.
   * @param nombre - Nombre completo del conductor.
   * @param email - Correo electrónico del conductor.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del conductor.
   * @param inicioTurno - Hora de inicio de turno en formato HH:mm:ss.
   * @param finalTurno - Hora de fin de turno en formato HH:mm:ss.
   * @param salario - Salario asignado al conductor.
   * @param licencia - Categoría de licencia de conducción (p. ej. C2).
   * @param tipoVehiculo - Tipo de vehículo que opera (p. ej. Camión, Moto).
   * @param experienciaAnios - Años de experiencia como conductor.
   * @param contrasena - Contraseña de acceso del conductor.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Actualiza los datos de un conductor existente identificado por su ID.
   *
   * @param id - ID interno del conductor a actualizar.
   * @param cedula - Número de cédula de identidad del conductor.
   * @param nombre - Nombre completo del conductor.
   * @param email - Correo electrónico del conductor.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del conductor.
   * @param inicioTurno - Hora de inicio de turno en formato HH:mm:ss.
   * @param finalTurno - Hora de fin de turno en formato HH:mm:ss.
   * @param salario - Salario asignado al conductor.
   * @param licencia - Categoría de licencia de conducción.
   * @param tipoVehiculo - Tipo de vehículo que opera.
   * @param experienciaAnios - Años de experiencia como conductor.
   * @param contrasena - Contraseña de acceso del conductor.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Elimina un conductor del sistema según su ID.
   *
   * @param id - ID interno del conductor a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deleteConductor(id: number) {
    return this.cliente.delete(this.urlbase + '/conductor/eliminar?id=' + id, {responseType: 'text'});
  }

}
