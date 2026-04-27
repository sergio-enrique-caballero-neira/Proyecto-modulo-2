import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ManipuladorModel} from '../models/manipulador.model';

/**
 * @service ManipuladorService
 * @description Servicio para gestionar las operaciones CRUD del recurso Manipulador
 * contra el backend REST. Un manipulador es un empleado encargado del manejo físico
 * de paquetes dentro de las instalaciones de la paquetería; se distingue por el área
 * donde opera y la cantidad de paquetes que ha procesado.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class ManipuladorService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de manipuladores registrados en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `ManipuladorModel`.
   */
  getManipuladores() {
    return this.cliente.get<ManipuladorModel[]>(this.urlbase + '/manipulador/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea un nuevo manipulador en el sistema.
   *
   * @param cedula - Número de cédula de identidad del manipulador.
   * @param nombre - Nombre completo del manipulador.
   * @param email - Correo electrónico del manipulador.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del manipulador.
   * @param inicioTurno - Hora de inicio de turno en formato HH:mm:ss.
   * @param finalTurno - Hora de fin de turno en formato HH:mm:ss.
   * @param salario - Salario asignado al manipulador.
   * @param area - Área de la bodega o instalación donde trabaja el manipulador.
   * @param paquetesProcesados - Cantidad de paquetes procesados por el manipulador.
   * @param contrasena - Contraseña de acceso del manipulador.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Actualiza los datos de un manipulador existente identificado por su ID.
   *
   * @param id - ID interno del manipulador a actualizar.
   * @param cedula - Número de cédula de identidad del manipulador.
   * @param nombre - Nombre completo del manipulador.
   * @param email - Correo electrónico del manipulador.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del manipulador.
   * @param inicioTurno - Hora de inicio de turno en formato HH:mm:ss.
   * @param finalTurno - Hora de fin de turno en formato HH:mm:ss.
   * @param salario - Salario asignado al manipulador.
   * @param area - Área de la bodega o instalación donde trabaja el manipulador.
   * @param paquetesProcesados - Cantidad de paquetes procesados por el manipulador.
   * @param contrasena - Contraseña de acceso del manipulador.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Elimina un manipulador del sistema según su ID.
   *
   * @param id - ID interno del manipulador a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deleteManipulador(id: number) {
    return this.cliente.delete(this.urlbase + '/manipulador/eliminar?id=' + id, {responseType: 'text'});
  }

}
