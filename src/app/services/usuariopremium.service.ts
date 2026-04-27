import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioPremiumModel} from '../models/usuarioPremium.model';

/**
 * @service UsuariopremiumService
 * @description Servicio para gestionar las operaciones CRUD del recurso Usuario Premium
 * contra el backend REST. Un usuario premium es un cliente con beneficios especiales
 * dentro del sistema de paquetería; su atributo distintivo es `descuento`, que
 * representa el porcentaje de reducción aplicado sobre sus envíos. Este tipo de
 * usuario es asignado desde el panel de administración, no por auto-registro.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class UsuariopremiumService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de usuarios premium registrados en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `UsuarioPremiumModel`.
   */
  getUsuarios() {
    return this.cliente.get<UsuarioPremiumModel[]>(this.urlbase + '/usuariopremium/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea un nuevo usuario premium en el sistema.
   *
   * @param cedula - Número de cédula de identidad del usuario.
   * @param nombre - Nombre completo del usuario.
   * @param email - Correo electrónico del usuario.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del usuario.
   * @param direccion - Dirección de residencia del usuario.
   * @param tipoUsuario - Tipo de usuario asignado (p. ej. PREMIUM).
   * @param descuento - Porcentaje de descuento aplicado sobre los envíos del usuario.
   * @param contrasena - Contraseña de acceso del usuario.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Actualiza los datos de un usuario premium existente identificado por su ID.
   *
   * @param id - ID interno del usuario premium a actualizar.
   * @param cedula - Número de cédula de identidad del usuario.
   * @param nombre - Nombre completo del usuario.
   * @param email - Correo electrónico del usuario.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del usuario.
   * @param direccion - Dirección de residencia del usuario.
   * @param tipoUsuario - Tipo de usuario asignado.
   * @param descuento - Porcentaje de descuento aplicado sobre los envíos del usuario.
   * @param contrasena - Contraseña de acceso del usuario.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Elimina un usuario premium del sistema según su ID.
   *
   * @param id - ID interno del usuario premium a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deleteUsuarioPremium(id: number) {
    return this.cliente.delete(this.urlbase + '/usuariopremium/eliminar?id=' + id, {responseType: 'text'});
  }

}
