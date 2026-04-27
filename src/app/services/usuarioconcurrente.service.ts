import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioConcurrenteModel} from '../models/usuarioConcurrente.model';

/**
 * @service UsuarioconcurrenteService
 * @description Servicio para gestionar las operaciones CRUD del recurso Usuario Concurrente
 * contra el backend REST. Un usuario concurrente es un cliente que realiza envíos de forma
 * frecuente y recurrente; sus atributos distintivos son `pedidosMensuales`, que registra
 * el volumen de pedidos por mes, y `descuento`, que refleja el beneficio económico
 * que obtiene por su fidelidad.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class UsuarioconcurrenteService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de usuarios concurrentes registrados en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `UsuarioConcurrenteModel`.
   */
  getUsuarios() {
    return this.cliente.get<UsuarioConcurrenteModel[]>(this.urlbase + '/usuarioconcurrente/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea un nuevo usuario concurrente en el sistema.
   *
   * @param cedula - Número de cédula de identidad del usuario.
   * @param nombre - Nombre completo del usuario.
   * @param email - Correo electrónico del usuario.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del usuario.
   * @param direccion - Dirección de residencia del usuario.
   * @param tipoUsuario - Tipo de usuario asignado (p. ej. CONCURRENTE).
   * @param pedidosMensuales - Cantidad de pedidos realizados por mes.
   * @param descuento - Porcentaje de descuento asignado al usuario por su frecuencia.
   * @param contrasena - Contraseña de acceso del usuario.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Actualiza los datos de un usuario concurrente existente identificado por su ID.
   *
   * @param id - ID interno del usuario concurrente a actualizar.
   * @param cedula - Número de cédula de identidad del usuario.
   * @param nombre - Nombre completo del usuario.
   * @param email - Correo electrónico del usuario.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del usuario.
   * @param direccion - Dirección de residencia del usuario.
   * @param tipoUsuario - Tipo de usuario asignado.
   * @param pedidosMensuales - Cantidad de pedidos realizados por mes.
   * @param descuento - Porcentaje de descuento asignado al usuario.
   * @param contrasena - Contraseña de acceso del usuario.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Elimina un usuario concurrente del sistema según su ID.
   *
   * @param id - ID interno del usuario concurrente a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deleteUsuarioConcurrente(id: number) {
    return this.cliente.delete(this.urlbase + '/usuarioconcurrente/eliminar?id=' + id, {responseType: 'text'});
  }

}
