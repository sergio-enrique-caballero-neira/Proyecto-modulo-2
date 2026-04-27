import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaqueteNoAlimenticioModel} from '../models/paqueteNoAlimenticio.model';

/**
 * @service PaquetenoalimenticioService
 * @description Servicio para gestionar las operaciones CRUD del recurso Paquete No Alimenticio
 * contra el backend REST. Un paquete no alimenticio es un tipo de envío que contiene
 * objetos no perecederos; su atributo distintivo es `fragil`, que indica si el contenido
 * requiere manejo especial para evitar daños durante el transporte.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class PaquetenoalimenticioService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de paquetes no alimenticios registrados en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `PaqueteNoAlimenticioModel`.
   */
  getPaquetesNoAlimenticios() {
    return this.cliente.get<PaqueteNoAlimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea un nuevo paquete no alimenticio en el sistema.
   *
   * @param descripcion - Descripción del contenido del paquete.
   * @param peso - Peso del paquete en gramos o kilogramos.
   * @param origen - Ciudad o dirección de origen del envío.
   * @param destino - Ciudad o dirección de destino del envío.
   * @param fechaEnvio - Fecha programada de envío en formato ISO (YYYY-MM-DD).
   * @param fragil - Indica si el paquete contiene objetos frágiles que requieren manejo especial.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  postPaqueteNoAlimenticio(descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, fragil: boolean) {
    const url = this.urlbase + '/paquetenoalimenticio/crear?' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'fragil=' + fragil;

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  /**
   * Actualiza los datos de un paquete no alimenticio existente identificado por su ID.
   *
   * @param id - ID interno del paquete no alimenticio a actualizar.
   * @param descripcion - Descripción del contenido del paquete.
   * @param peso - Peso del paquete.
   * @param origen - Ciudad o dirección de origen del envío.
   * @param destino - Ciudad o dirección de destino del envío.
   * @param fechaEnvio - Fecha programada de envío en formato ISO (YYYY-MM-DD).
   * @param fragil - Indica si el paquete contiene objetos frágiles que requieren manejo especial.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  putPaqueteNoAlimenticio(id: number, descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, fragil: boolean) {
    const url = this.urlbase + '/paquetenoalimenticio/actualizar?' +
      'id=' + id + '&' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'fragil=' + fragil;

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  /**
   * Elimina un paquete no alimenticio del sistema según su ID.
   *
   * @param id - ID interno del paquete no alimenticio a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deletePaqueteNoAlimenticio(id: number) {
    return this.cliente.delete(this.urlbase + '/paquetenoalimenticio/eliminar?id=' + id, {responseType: 'text'});
  }

}
