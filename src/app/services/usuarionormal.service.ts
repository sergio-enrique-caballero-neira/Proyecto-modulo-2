import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioNormalModel} from '../models/usuarioNormal.model';

/**
 * @service UsuarionormalService
 * @description Servicio para gestionar las operaciones CRUD del recurso Usuario Normal
 * contra el backend REST. Un usuario normal es el tipo de cliente base del sistema
 * de paquetería; puede auto-registrarse desde el formulario público y no posee
 * beneficios adicionales como descuentos o acceso prioritario.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class UsuarionormalService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de usuarios normales registrados en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `UsuarioNormalModel`.
   */
  getUsuarios() {
    return this.cliente.get<UsuarioNormalModel[]>(this.urlbase + '/usuarionormal/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea un nuevo usuario normal en el sistema.
   *
   * @param cedula - Número de cédula de identidad del usuario.
   * @param nombre - Nombre completo del usuario.
   * @param email - Correo electrónico del usuario.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del usuario.
   * @param direccion - Dirección de residencia del usuario.
   * @param tipoUsuario - Tipo de usuario asignado (siempre 'NORMAL' en el registro público).
   * @param contrasena - Contraseña de acceso del usuario.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Actualiza los datos de un usuario normal existente identificado por su ID.
   *
   * @param id - ID interno del usuario normal a actualizar.
   * @param cedula - Número de cédula de identidad del usuario.
   * @param nombre - Nombre completo del usuario.
   * @param email - Correo electrónico del usuario.
   * @param telefono - Número de teléfono de contacto.
   * @param edad - Edad del usuario.
   * @param direccion - Dirección de residencia del usuario.
   * @param tipoUsuario - Tipo de usuario asignado.
   * @param contrasena - Contraseña de acceso del usuario.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Elimina un usuario normal del sistema según su ID.
   *
   * @param id - ID interno del usuario normal a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deleteUsuarioNormal(id: number) {
    return this.cliente.delete(this.urlbase + '/usuarionormal/eliminar?id=' + id, {responseType: 'text'});
  }

}
