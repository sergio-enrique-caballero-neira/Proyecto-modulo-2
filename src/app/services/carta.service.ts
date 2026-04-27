import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartaModel} from '../models/carta.model';

/**
 * @service CartaService
 * @description Servicio para gestionar las operaciones CRUD del recurso Carta
 * contra el backend REST. Una carta es un tipo de envío postal de menor volumen
 * dentro del sistema de paquetería.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class CartaService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de cartas registradas en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `CartaModel`.
   */
  getCartas() {
    return this.cliente.get<CartaModel[]>(this.urlbase + '/carta/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea una nueva carta en el sistema.
   *
   * @param descripcion - Descripción del contenido de la carta.
   * @param peso - Peso de la carta en gramos o kilogramos.
   * @param origen - Ciudad o dirección de origen del envío.
   * @param destino - Ciudad o dirección de destino del envío.
   * @param fechaEnvio - Fecha programada de envío en formato ISO (YYYY-MM-DD).
   * @param tamano - Tamaño de la carta (p. ej. A4, A5, Oficio).
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  postCarta(descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, tamano: string) {
    const url = this.urlbase + '/carta/crear?' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'tamano=' + encodeURIComponent(tamano);

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  /**
   * Actualiza los datos de una carta existente identificada por su ID.
   *
   * @param id - ID interno de la carta a actualizar.
   * @param descripcion - Descripción del contenido de la carta.
   * @param peso - Peso de la carta.
   * @param origen - Ciudad o dirección de origen del envío.
   * @param destino - Ciudad o dirección de destino del envío.
   * @param fechaEnvio - Fecha programada de envío en formato ISO (YYYY-MM-DD).
   * @param tamano - Tamaño de la carta.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  putCarta(id: number, descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, tamano: string) {
    const url = this.urlbase + '/carta/actualizar?' +
      'id=' + id + '&' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'tamano=' + encodeURIComponent(tamano);

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  /**
   * Elimina una carta del sistema según su ID.
   *
   * @param id - ID interno de la carta a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deleteCarta(id: number) {
    return this.cliente.delete(this.urlbase + '/carta/eliminar?id=' + id, {responseType: 'text'});
  }

}
