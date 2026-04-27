import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdministradorModel} from '../models/administrador.model';

/**
 * @service AdministradorService
 * @description Servicio para gestionar las operaciones CRUD del recurso Administrador
 * contra el backend REST. Un administrador es un empleado con acceso al panel
 *de gestión del sistema de paquetería; puede tener o no acceso total según su rol.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class AdministradorService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de administradores registrados en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `AdministradorModel`.
   */
  getAdministradores() {
    return this.cliente.get<AdministradorModel[]>(this.urlbase + '/administrador/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea un nuevo administrador en el sistema.
   *
   * @param cedula - Número de cédula de identidad del administrador.
   * @param nombre - Nombre completo del administrador.
   * @param email - Correo electrónico del administrador.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del administrador.
   * @param inicioTurno - Hora de inicio de turno en formato HH:mm:ss.
   * @param finalTurno - Hora de fin de turno en formato HH:mm:ss.
   * @param salario - Salario asignado al administrador.
   * @param rol - Rol o cargo del administrador dentro del sistema.
   * @param accesoTotal - Indica si el administrador tiene acceso total al sistema.
   * @param contrasena - Contraseña de acceso del administrador.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Actualiza los datos de un administrador existente identificado por su ID.
   *
   * @param id - ID interno del administrador a actualizar.
   * @param cedula - Número de cédula de identidad del administrador.
   * @param nombre - Nombre completo del administrador.
   * @param email - Correo electrónico del administrador.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del administrador.
   * @param inicioTurno - Hora de inicio de turno en formato HH:mm:ss.
   * @param finalTurno - Hora de fin de turno en formato HH:mm:ss.
   * @param salario - Salario asignado al administrador.
   * @param rol - Rol o cargo del administrador dentro del sistema.
   * @param accesoTotal - Indica si el administrador tiene acceso total al sistema.
   * @param contrasena - Contraseña de acceso del administrador.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Elimina un administrador del sistema según su ID.
   *
   * @param id - ID interno del administrador a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deleteAdministrador(id: number) {
    return this.cliente.delete(this.urlbase + '/administrador/eliminar?id=' + id, {responseType: 'text'});
  }

}
